const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    password : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        //unique : true,
    }
});

const user = mongoose.model("user",userSchema);

module.exports = user;