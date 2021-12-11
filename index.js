const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Require jsonwebtoken
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/personsDB",{useNewUrlParser:true});
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const saltRounds = 10; //Number of salt rounds is kept to 10;
//Create a New Schema
const personSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:Number,
    address:String,
    password:String
});
const PORT = process.env.port||3001;
//Use the Schema to create a mongoose model
const Person = mongoose.model("Person",personSchema);
app.get("/",(req,res)=>{
    res.sendFile("../static/index.html",{root:__dirname});
})
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.get("/api",(req,res)=>{
    res.json({message:"<h1>Hello from server</h1>"});
})
app.post("/",urlencodedParser,(req,res)=>{
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password =req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        //save the hash in the db
        if(err){
            console.log(err)
        }
        const person = new Person({
        firstName:firstName,
        lastName:lastName,
        email:email,
        phone:phone,
        address:address,
        password:hash
    });
    new Person(person).save((err)=>{
        if(err){
            res.send("<b>Could not register</b>");
        }
        else{
            res.send("Registeration successful.")
        }
    })
      })   
});
function givePassword(password)
{
    return bcrypt.hash(password,saltRounds,(hash,err)=>{
        if(!err){
            return hash;
        }
    })
}
//Secret Key
const accessTokenSecret = "myAccessTokenSecret";
app.post("/login",urlencodedParser,(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = Person.find({"email":email,"password":givePassword(password)})
    if(user)
    {
        const jsonWebToken = jwt.sign({firstName:user.firstName,lastName:user.lastName,email:user.email,phone:user.phone,address:user.address},
        accessTokenSecret);
        console.log("Password is matched");
        res.json({
            jsonWebToken
        })
    }else{
        console.log("Password is incorrect");
    }
});
app.listen(PORT,(err)=>{
    if(!err)
    {
        console.log("Listening on port "+PORT);
    }
})
/* Here we can compare the hashed password after we get it from
the database with the plaintext password */
/*bcrypt.compare(myPlaintextPassword, hash, function(error, response) {
    // response == true if they match
    // response == false if password is wrong
});
*/