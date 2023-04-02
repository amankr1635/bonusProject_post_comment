const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");


const createComment = async function(req,res){
try {
        let body = req.body
        
        if(!body) return res.status(400).send({status: false,message: "enter details"})
    
        if(!body.postId) return res.status(400).send({status:false, message:"enter postId"})
        if(body.reply){
            delete reply
        }
        let create = await commentModel.create(body)
    
        await postModel.findOneAndUpdate({userId: body.userId},{$push:{allComments:body.comment},$inc:{comment:1}},{new:true})
        
        return res.status(201).send({status:true,data:create})
} catch (error) {
    return res.status(500).send({staus:false,message:error.message})
}
}

const replyComment =async function(req,res){
try {
        let body = req.body
        if(!body.commentId) res.status(400).send({status: false, message: "enter commentID"})
        let reply = await commentModel.findOneAndUpdate({_id:body.commentId},{$push:{reply:body.reply}},{new:true})
        return res.status(200).send({status:false,data:reply})
} catch (error) {
    return res.status(500).send({status: false,message: error.message})
}
}


const updateComment =async function(req,res){
try {
        let decodedToken = req.decodedToken
        let body = req.body
        let commentCheck = await commentModel.findOne({_id: body.commentId})
        if(!commentCheck) return res.status(404).send({status:false, message: "you have not commented yet"})
        if(commentCheck.userId.toString() != decodedToken.userId.toString())return res.status(403).send({status:false,message: "you are not authorised for it"})
        let update = await commentModel.findOneAndUpdate({_id:body.commentId},{comment:body.comment},{new:true})
    
        return res.status(200).send({status:true,data:update})
} catch (error) {
    return res.status(500).send({status:false, message: error.message})
}
}

const deleteComment =async function(req,res){
try {
    
    let body = req.body

    let checkCommentId = await commentModel.findOne({_id:body.commentId,isDeleted:false})
    if(!checkCommentId) return res.status(400).send({status:false,message:"no comment found"})
    let checkPostId = await postModel.findOne({_id: checkCommentId.postId,isDeleted:false})
    if(!checkPostId) return res.status(404).send({status:false,message:"post not found"})

    if(req.decodedToken.userId!=checkCommentId.userId){
        if(req.decodedToken.userId != checkPostId) return res.status(400).send({status:false, message:"you have no comment on this"})
    }
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
module.exports.replyComment = replyComment
