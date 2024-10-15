const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const SECRET_KEY = "this"
const userSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true,
        minlength:6

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

//hashing the password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        const newtoken = jwt.sign({_id:this._id}, SECRET_KEY,
            {expiresIn:"1d"}
        );
        this.tokens = this.tokens.concat({token:newtoken});
        await this.save();
        return newtoken;
    }catch(err){
        response.status(400).json({error:"Token not generated"});
        console.log(err);
    }
}
// Creating a model
const users = new mongoose.model("users", userSchema);
module.exports = users;