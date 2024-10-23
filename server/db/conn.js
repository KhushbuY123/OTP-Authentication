// establish connection with mongodb database

const mongoose = require("mongoose");
const DB = process.env.DATABASE;


mongoose
  .connect(DB, {
     // Ensures Mongoose uses the new connection management engine for better stability and performance
    useUnifiedTopology: true,
     // Ensures Mongoose uses the new URL string parser for MongoDB connection strings
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection successful");
  }).catch((err) => console.log("No connection", err));


