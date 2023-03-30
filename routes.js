const express = require("express");
const router = express.Router()
const{userCreate} = require("./controllers/userConstroller");
const{createPost, updatePost, deletePost} = require("./controllers/postController");
const{createComment, updateComment,deleteComment}= require("./controllers/commentController");


router.get("/test-me",function(req,res){
    res.send({msg: "Api is working"})
})

router.post("/createUser", userCreate);
router.post("/createPost",createPost);
router.put("/updatePost", updatePost);
router.post("/createComment",createComment);
router.put("/updateComment", updateComment);
router.delete("/deletePost",deletePost);
router.delete("/deleteComment",deleteComment);



module.exports = router