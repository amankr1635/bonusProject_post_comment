const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");


const createComment = async function(req,res){
    let body = req.body
    
    if(!body) return res.status(400).send({status: false,message: "enter details"})

    if(!body.postId) return res.status(400).send({status:false, message:"enter postId"})

    let create = await commentModel.create(body)
    await postModel.findOneAndUpdate(body.userId,{$inc:{comment:1}},{new:true})
    return res.status(201).send({status:true,data:create})
}

const updateComment =async function(req,res){

    let body = req.body

    let update = await commentModel.findOneAndUpdate({_id:body.commentId},{comment:body.comment})

    return res.status(200).send({status:true,data:update})
}

const deleteComment =async function(req,res){
try {
    
        let body = req.body
    
        let checkData = await commentModel.findOneAndUpdate({_id:body.commentId,isDeleted:false},{isDeleted: true})
        if(!checkData)return res.status(404).send({status:false, message:"comment not found"})
    
        return res.status(200).send({staus:true,message:"Deleted sucessfully"})
    
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}

module.exports.createComment=createComment
module.exports.updateComment=updateComment
module.exports.deleteComment = deleteComment
