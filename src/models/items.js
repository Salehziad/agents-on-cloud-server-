const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const itemSchema = mongoose.Schema({
    title: String,
    image: String,
    userId: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Item', itemSchema);
