const Favourites = require('../models/favourites');

exports.favouriteById = (req, res, next, id) => {
    console.log(id)
    Favourites
        .findById({_id: id})
        .exec((err, favourite) => {
            if (err &&!favourite) {
                return res
                    .status(400)
                    .json({error: 'Favourite does not exist'});
            }
            req.favourite = favourite;
            next();
        });
};

exports.createFavourites = async(req, res) => {
    const item = new Favourites();
    item.item = req.item._id
    item.userId = req.auth._id
    try {
        await item.save();
        res
            .status(201)
            .json(item);
    } catch (error) {}
}

exports.getUserFavourites = async(req, res) => {
    try {
        const item = await Favourites.find({userId: req.profile._id}).populate('item')
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
    const favourite=req.favourite
    if (req.favourite.userId == req.profile._id) {
        favourite.remove((err, deleteditem) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            res.json({message: 'favourite deleted successfully'});
        });
    } else {
        res.send('Access denied')
    }
}