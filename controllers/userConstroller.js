const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userCreate = async function(req,res){
try {
      let body = req.body
      if(!body) res.status(400).send({status:false, message:"please enter body"})
      if(body.title!="Mr"&&body.title!="Mrs"&&body.title!="Miss")res.status(400).send({status: false, message:"enter any one of these ['Mr','Mrs','Miss']"})
      if(!body.name) res.status(400).send({status: false,message:"please enter name"})
      if(!body.password)res.status(400).send({status:false,message:"please enter password"})
      let userExist = await userModel.find({
          $or: [{ email: body.email }, { phoneNo: body.phoneNo }],
        });
        if (userExist.length >= 1) {
          if (body.email == userExist[0].email) {
            return res
              .status(400)
              .send({ status: false, message: "email is already exist" });
          } else{
              return res
              .status(400)
              .send({ status: false, message: "phone is already exist" });
          }
      }
      let create = await userModel.create(body)
      return res.status(201).send({status: true,data: create})
      
} catch (error) {
   return res.status(500).send({status: false, message: error.message})
}
}    


const userLogin = async function(req,res){
 try {
   
   let body = req.body
   if(!body)return res.status(400).send({status: false,message:"enter data in body"})
   if(!body.email)return res.status(400).send({status: false,message:"enter email id"})
 
   let userExist = await userModel.findOne({ $or:[{email:body.email},{phoneNo:body.phoneNo}]})
 
   if(!userExist) return res.status(404).send({status: false,message:"no user exist"})
 
   let token =jwt.sign({userId: userExist._id},{email:userExist.email},{phoneNo:userExist.phoneNo},"thisislogin")
 
   return res.status(200).send({status:true,token:token})
 } catch (error) {
    return res.status(500).send({status:false, message:error.message})
 }

}



module.exports.userCreate = userCreate
module.exports.userLogin  = userLogin 