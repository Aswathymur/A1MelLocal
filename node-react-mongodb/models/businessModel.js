const mongoose = require('mongoose')
const Schema = mongoose.Schema


const businessSchema = new mongoose.Schema({
    business_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    checked:{
        type: Boolean,
        default: false
    },
    menu:{
        type: Object,
        required: false
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Businesses", businessSchema)
