const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const favouritesSchema = mongoose.Schema({
    item: {
        type: ObjectId,
        ref: "Item",
        required: true
    },
    userId: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Favourites', favouritesSchema);
