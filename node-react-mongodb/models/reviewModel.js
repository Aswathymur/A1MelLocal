const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    business:{
        type: Schema.Types.ObjectId,
        ref: "Businesses"
    },
    rating:{
        type: Number,
        trim: true,
        required: true
    },
    comment: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Reviews", reviewSchema);
