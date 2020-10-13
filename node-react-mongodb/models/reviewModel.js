const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    writer: {
        type: String,
        trim: true,
        required: true
    },
    rating:{
        type: Number,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Reviews", reviewSchema);
