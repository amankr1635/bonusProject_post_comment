const jwt = require("jsonwebtoken");

const authentication = async function(req,res,next){
 try {
       
       let token = req.headers["x-api-key"]
   
       jwt.verify(token,"thisislogin", (err,decodedToken)=>{
           if(err){
               return res.status(400).send({status:false,message:err.message})
           }
           req.decodedToken = decodedToken
           next()
       })
   
 } catch (error) {
    return res.status(500).send({status:false,message:error.message})
 }
}

const authorization= async function(req,res,next){
try {
    
        let body = req.body
        let userId = req.decodedToken.userId
    
        let userDetail = await userModel.findOne({_id: body.userId }) 
        if(userDetail.userId!= userId) return res.status(403).send({status:false, message:"you are not authorise"})
        next()
    
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}

}

module.exports.authentication =authentication
module.exports.authorization = authorization
