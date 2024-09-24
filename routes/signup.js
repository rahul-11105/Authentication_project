const express = require("express");
const user = require("../model/schema");
const {setUser,getUser} = require("../middlware/auth")
const routes = express.Router();


routes.get("/signup",(req,res)=>{
    res.render("signup"); 
});
 
routes.get("/login",(req,res)=>{
    res.render("login");
});

routes.post("/signup-form",(req,res)=>{
    const {username, userpass, useremail} = req.body;
    const user1 = new user({
        name : username,
        password : userpass,
        email : useremail,
    }); 
     user1.save().then((res)=>{
        console.log("user created successfully!")
     });

     const token = setUser(req.body);
     res.cookie("uid",token);
     res.render("resp");
    
});

routes.post("/login", async (req,res)=>{
    if(!req.cookies.uid){
        res.render("signup.ejs")
    }
    const token = req.cookies.uid;
    const existuser = getUser(token);
    console.log('Retrieved token:', token); 

    //console.log(existuser.email);

    if((req.body.useremail)===(existuser.email)){
        let us = await user.findOne({email:req.body.useremail});
        
        //console.log(us.password);
        //console.log(req.body.userpass);

        if(us.password===req.body.userpass){
            res.render('resp');
        }
        else{
            res.render('Alert_login');
        }
        
    }
    else{ 
        // let msg = 'please enter the valid email.!';
        // res.render('login.ejs',{msg:msg});
        res.render('Alert_login');
    }

    //if(!existuser) {
    //    console.log("you where not signed up !");
    //    res.end("error");
    //}  
    //else{
    //    res.end("wowwwwwwwwwww supperrrrrrrr");
    //}
});

module.exports = routes;