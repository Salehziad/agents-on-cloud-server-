const Comments = require('../models/comments');

exports.commentById = (req, res, next, id) => {
    Comments
        .findById({_id: id})
        .exec((err, comment) => {
            if (err || !Comments) {
                return res
                    .status(400)
                    .json({error: 'Item does not exist'});
            }
            req.comment = comment;
            next();
        });
};

exports.createComment = async(req, res) => {
    console.log(req.item._id)
    const item = new Comments(req.body);
    item.userId = req.auth._id
    item.itemId = req.item._id
    try {
        await item.save();
        res
            .status(201)
            .json(item);
    } catch (error) {}
}

exports.getItemComments = async(req, res) => {
    try {
        const item = await Comments.find({itemId: req.item._id})
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
    // console.log(req.comment)
    const comment=req.comment
    // console.log(req.profile)
    // res.send('hello')
    const item = req.item;
    if (req.comment.userId == req.profile._id) {
        comment.remove((err, deleteditem) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            res.json({message: 'Comments deleted successfully'});
        });
    } else {
        res.send('Access denied')
    }
}