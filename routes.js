const express = require("express");
const router = express.Router()
const{userCreate} = require("./controllers/userConstroller");


router.get("/test-me",function(req,res){
    res.send({msg: "Api is working"})
})

router.post("/createUser", userCreate);


module.exports = router