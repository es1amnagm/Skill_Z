const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGO_URI; 
module.exports= () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected successfully to database : ");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
