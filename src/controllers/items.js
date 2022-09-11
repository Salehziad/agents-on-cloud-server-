const Item = require('../models/items');

exports.itemById = (req, res, next, id) => {
    Item
        .findById({_id: id})
        .exec((err, item) => {
            if (err || !Item) {
                return res
                    .status(400)
                    .json({error: 'Item does not exist'});
            }
            req.item = item;
            next();
        });
};

exports.getItems = async(req, res) => {
    try {
        const item = await Item
            .find()
        res.status(200)
            .json(item);
    } catch (error) {
        res
            .status(404)
            .json({message: error.message});
    }
}

exports.createItem = async(req, res) => {
    const item = new Item(req.body);
    item.userId = req.auth._id
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
        const item = await Item
            .find({userId: req.profile._id})
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
    if(req.item.userId==req.profile._id){   
        item.remove((err, deleteditem) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json({
                message: 'item deleted successfully'
            });
        });
    }else{
        res.send('Access denied')
    }
}

exports.test = async(req, res) => {
    const item = req.item;
    item.title = req.body.title;
    item.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
}

// get  by id
// compare user id in element with user id