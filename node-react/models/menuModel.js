const mongoose = require('mongoose')


const menuSchema = new mongoose.Schema({
    menu_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Menu", menuSchema)