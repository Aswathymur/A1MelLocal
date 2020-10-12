const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    favourite: {
        type: Array,
        default: []
    },
    business: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)