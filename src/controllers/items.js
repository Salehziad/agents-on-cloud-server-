const Item = require('../models/items');

exports.itemById = (req, res, next, id) => {
    console.log(id)
    Item
        .findById({_id: id})
        .exec((err, item) => {
            if (err || !Item) {
                return res
                    .json({error: 'Item does not exist'});
            }
            req.item = item;
            next();
        });
};

exports.getItems = async(req, res) => {
    try {
        const item = await Item.find().select()
        .populate('user')
        res
            .status(200)
            .json(item);
    } catch (error) {
        res
            .status(404)
            .json({message: error.message});
    }
}

exports.getOneItem=(req,res)=>{
    const item = req.item
    res
        .status(200)
        .json(item);
}

exports.createItem = async(req, res) => {
    console.log(req.body)
    const item = new Item(req.body);
    item.userId = req.auth._id
    item.user = req.auth._id
    try {
        await item.save();
        res
            .status(201)
            .json(item);
    } catch (error) {}
}

exports.listByUser = async(req, res) => {
    console.log(req.profile)
    try {
        const item = await Item.find({userId: req.profile._id})
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
    const item = req.item;
    console.log(item)
    if (req.item.userId == req.profile._id) {
        item.remove((err, deleteditem) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            res.json({message: 'item deleted successfully'});
        });
    } else {
        res.send('Access denied')
    }
}

exports.update = async(req, res) => {
    if (req.item.userId == req.profile._id) {
        const item = req.item;
        item.name = req.body.name;
        item.image = req.body.image;
        item.description = req.body.description;
        item.price = req.body.price;
        item.location = req.body.location;
        item.category = req.body.category;
        item.save((err, data) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            res.json(data);
        });
    } else {
        res.send('Access denied')
    }
}

// get  by id compare user id in element with user id