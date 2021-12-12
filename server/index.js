//Require Express
const express = require("express");
//Function to use express
const app = express();
//Require bodyParser
var bodyParser = require("body-parser");
//Require Mongoose
const mongoose = require("mongoose");
//Require Bcrypt
const bcrypt = require("bcrypt");
//Require jsonwebtoken
const jwt = require("jsonwebtoken");
//Mongoose connection
mongoose.connect("mongodb://localhost:27017/personsDB",{useNewUrlParser:true});
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Number of salt rounds is kept to 10;
const saltRounds = 10;
app.use(express.json())
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
var person = new Person({
    firstName:"undefined",
    lastName:"undefined",
    email:"undefined",
    phone:1000010001,
    email:"undefined",
    password:"undefined"
})
app.get("/",(req,res)=>{
    res.sendFile("index.html",{root:__dirname});
})
app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.get("/api",(req,res)=>{
    res.json({message:"Hello from server"});
})
app.post("/api/register",urlencodedParser,
    (req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
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
    console.log(person);
    new Person(person).save((err)=>{
        if(err){
            res.send("<b>Could not register</b>");
        }
        else{
            console.log("Registered successfully");
            res.send("Registeration successful.")
        }
    })
      })   
});

//Secret Key
const accessTokenSecret = "myAccessTokenSecret";
const authenticateJWT = (req,res,next)=>{
    const authheader = req.headers.authorization;
    if(authheader)
    {
        const token = authheader.split('')[1];
        jwt.verify(token,accessTokenSecret,(err,user)=>{
            req.user = user;
            next();
        })
    }else{
        res.sendStatus(401);
    }
}

app.post("/api/login",urlencodedParser,(req,res)=>{
    console.log("/api/login is called");
    const {email,password} = req.body;
    var query = {email:email};
    Person.findOne(query,(err,results)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            if(results){
            bcrypt.compare(password, results.password, function(error, response) {
                if(response)
                {
                    person.firstName = results.firstName;
                    person.lastName = results.lastName;
                    person.phone = results.phone;
                    person.address = results.address;
                    console.log(person.firstName,person.lastName,person.phone,person.address);
                    const jsonWebToken = jwt.sign({"email":results.email,"password":results.password},
                    accessTokenSecret);
                    console.log("Password is matched");
                    res.json({
                        jsonWebToken  
                    })
                }
                else{
                    console.log("Password is wrong");
                }}
                
            )}
            else{
                console.log("Email does not exist");
            } 
        }})
});
app.get("/api/login/profile",authenticateJWT,(req,res)=>{
    console.log("/api/login/profile is called")
    res.json({
        "firstName":person.firstName,
        "lastName":person.lastName,
        "email":person.email,
        "address":person.address,
        "phone":person.phone
    })
})
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