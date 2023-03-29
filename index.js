const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express()

app.use(express.json())
mongoose.connect("mongodb+srv://amankr1635:VNgsREYA9NfobsPM@cluster0.z1bikfo.mongodb.net/bonusProject-post_comment")
.then(()=> console.log("Mongo Db is connected"))
.catch((err)=> console.log(err))

app.use("/",routes)

app.listen(3000,()=>{
    console.log("server is running on", 3000)
})