const Cart = require('../models/cart');

exports.cartById = (req, res, next, id) => {
    Cart
        .findById({_id: id})
        .exec((err, cart) => {
            if (err &&!cart) {
                return res
                    .status(400)
                    .json({error: 'cart does not exist'});
            }
            req.cart = cart;
            next();
        });
};

exports.createCart = async(req, res) => {
    const item = new Cart();
    item.item = req.item._id
    item.userId = req.auth._id
    try {
        await item.save();
        res
            .status(201)
            .json(item);
    } catch (error) {}
}

exports.getUserCart = async(req, res) => {
    try {
        const item = await Cart.find({userId: req.profile._id}).populate('item')
        res
            .status(200)
            .json(item);
    } catch (error) {
        res
            .status(404)
            .json({message: error.message});
    }
}

exports.remove = async(req, res) => {
    const cart=req.cart
    if (req.cart.userId == req.profile._id) {
        cart.remove((err, deleteditem) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            res.json({message: 'cart deleted successfully'});
        });
    } else {
        res.send('Access denied')
    }
}