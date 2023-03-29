const userModel = require("../models/userModel");

const userCreate = async function(req,res){
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
    }    

module.exports.userCreate = userCreate