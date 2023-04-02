const express = require("express");
const router = express.Router()
const{userCreate,userLogin } = require("./controllers/userConstroller");
const{createPost, updatePost, deletePost,getAllPost} = require("./controllers/postController");
const{createComment, replyComment ,updateComment,deleteComment}= require("./controllers/commentController");
const{authentication, authorization} =require("./authorization/authorization")


router.get("/test-me",function(req,res){
    res.send({msg: "Api is working"})
})

router.post("/createUser", userCreate);
router.post("/userLogin",userLogin);
router.post("/createPost",authentication,authorization,createPost);
router.put("/updatePost",authentication , updatePost);
router.post("/createComment" ,authentication,authorization, createComment);
router.put("/updateComment",authentication, updateComment);
router.delete("/deletePost",authentication,deletePost);
router.delete("/deleteComment",authentication,deleteComment);
router.get("/getAllPost",authentication,getAllPost);
router.post("/replyComment",authentication,replyComment);

router.all("/*" ,(req,res)=>{
    return res.status(404).send({status:false,message: "Invalid Http request"})
})


module.exports = router