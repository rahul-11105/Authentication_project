const express = require("express");
const main = require("./connection/connect");
const user = require("./model/schema");
const signup = require("./routes/signup");
const cookieParser = require('cookie-parser');
const path = require("path");
const {createUserUid} = require("./middlware/auth");

const bcrypt = require('bcryptjs');

const createSalt = async ()=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('rahul',salt);

    console.log(salt);
    console.log(hash);
}

createSalt();

const app = express(); 
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));
 
app.set("view engine","ejs");   


app.set("views",path.resolve("./views"));

main("mongodb+srv://auth_pro:11105@cluster0.trdae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((data)=>{
    console.log("mongoDb connected successfully!");
}) 
.catch((err)=>{
    console.log("mongoDB connection error!");
})

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // This middleware is necessary to parse cookies

//routes;
app.use("/home1",createUserUid,signup);
app.get("/home",(req,res)=>{
    res.render("home.ejs");
})
app.listen(port,()=>console.log(`server started successfuly at port ${port}.`)); 