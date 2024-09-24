const mongoose = require("mongoose");

const main = async (url)=>{
    await mongoose.connect(url);
}

module.exports = main;