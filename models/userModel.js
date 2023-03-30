const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        enum: ["Mr","Mrs","Miss"]
    },
    name:{
        type: String,
        required: true,
    },
    phoneNo:{
        type: String,
        unique: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports =mongoose.model("userData",userSchema)