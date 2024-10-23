const mongoose = require("mongoose");
const validator = require("validator");
const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        minlength:10,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")}}
    },
    location:{
        type:String,
        required:true,
        minlength:6

    },
   assign:{
        type:String,
        required:true
   }
});

// Creating a model
const clients = new mongoose.model("clients", clientSchema);
module.exports = clients;