const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const itemSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Item', itemSchema);
