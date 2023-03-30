const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData"
    },
    image :{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    comment:{
        type: Number,
        default :0
    },
    isDelete:{
        type:Boolean,
        default: false
    }
},{timestamps:true})
module.exports = mongoose.model("postData",postSchema)