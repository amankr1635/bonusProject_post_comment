const mongoose = require("mongoose");

const commentModel =new mongoose.Schema({
    postId:{
        type: mongoose.Types.ObjectId,
        ref: "postData",
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "userData",
        // extract from jwt token not from the body
    },
    comment : {
        type: String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps: true})
module.exports = mongoose.model("commentData",commentModel)