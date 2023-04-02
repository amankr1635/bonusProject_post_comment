const aws = require('aws-sdk')

const uploadFile = async (files) => {

    return new Promise(function (resolve, reject) {
        aws.config.update({
            accessKeyId: "AKIAY3L35MCRZNIRGT6N",
            secretAccessKey: "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",
            region: "ap-south-1"
        })
        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        let uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "TNAP/productManagement/" + files.originalname,
            Body: files.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
    })
}
// module.exports = { uploadFile }


const postModel = require("../models/postModel");

const createPost =async function(req,res){
try {
    let body = req.body
    let files = req.files
    if(body.isDeleted){
        body.isDeleted = false
    }
    if(!body.description)return res.status(400).send({status: false,message:"enter description"})
    if(files&&files.length>0){
        let fileUrl = await uploadFile(files[0])
        body.image = fileUrl 
    }else{
        return res.status(400).send({status: false,message:"please provide image to post"})
    }
    let create = await postModel.create(body)
    return res.status(201).send({status: true, data: create})
    
} catch (error) {
    return res.status(500).send({status: false, message: error.message})
}
}

const updatePost =async function(req,res){
try {
    
    let body =req.body
    if(body.isDeleted){
        body.isDeleted =false
    }
    if(req.files&&req.files.length>0){
        let fileUrl = await uploadFile(req.files[0])
        body.image = fileUrl 
    }
    if(!body) res.status(400).send({status:false,message: "enter data in body" })
    let checkPost = await postModel.findOne({_id:body.postId, isDeleted:false})
     if(!checkPost) return res.status(404).send({staus:false,message:"no post exist"})
    
    if(req.decodedToken.userId != checkPost.userId )return res.status(403).send({staus:false,message:"you are not authorised"})

    let updatedData =await postModel.findOneAndUpdate({_id:body.postId},body,{new:true})

    return res.status(200).send({status:true,message:updatedData})

} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}

const deletePost = async function(req,res){
try {
    
    let body = req.body

    let checkPost = await postModel.findOne({_id:body.postId,isDeleted:false})
     if(!checkPost) return res.status(404).send({staus:false,message:"no post exist"})
    
    if(req.decodedToken.userId != checkPost.userId )return res.status(403).send({staus:false,message:"you are not authorised"})

    let checkData = await postModel.findOneAndUpdate({_id:body.postId,isDeleted:false},{isDeleted: true})
    if(!checkData)return res.status(404).send({status:false, message:"post not found"})

    return res.status(200).send({staus:true,message:"Deleted sucessfully"})

} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}

const getAllPost=async function(req,res){
    try {
        
        let getData = await postModel.find()
    
        return res.status(200).send({status:true, data:getData})
    } catch (error) {
        return res.status(500).send({staus:false,message:error.message})
    }
}



module.exports.createPost = createPost
module.exports.updatePost = updatePost
module.exports.deletePost = deletePost
module.exports.getAllPost=getAllPost
