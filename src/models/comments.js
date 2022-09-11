const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const commentsSchema = mongoose.Schema({
    title: String,
    userId: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Comments', commentsSchema);
