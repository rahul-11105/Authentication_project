const jwt = require("jsonwebtoken");
const secrete = "rahul98765sej765LT7499916161";

const setUser = (user)=>{
    return jwt.sign({email:user.useremail,password:user.userpassword},secrete)
}

const getUser = (token)=>{

    const decoded = jwt.verify(token,secrete);
    return decoded;
}

const createUserUid = (req,res,next)=>{
    next(); 
}

module.exports = {setUser,getUser,createUserUid};