const mongoose=require("mongoose");
const Joi = require("joi");
require("dotenv").config();
const jwt =require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
        userName:{
        type:String,
        required:true,
        trim:true,
    },
        password:{
        type:String,
        required:true,
        trim:true,
        minLength: 6,
    },
        isAdmin:{
        type:Boolean,
        default:false
    },

},{timeStamp:true});

// Create methods in User Class
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};



//Book Model

const User=mongoose.model("User",userSchema);


// Validate Register User
function validateRegisterUser(obj) {
const userSchema = Joi.object({
        email: Joi.string().email().required(),
        userName: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        
}); 
return userSchema.validate(obj);
}


// Validate Login User 
function validateLoginUser(obj) {
const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
}); 
return userSchema.validate(obj);
}

// Validate Update User 
function validateUpdateUser(obj) {
const userSchema = Joi.object({
        email: Joi.string().email(),
        userName: Joi.string().min(3),
        password: Joi.string().min(6),
}).min(1); 
return userSchema.validate(obj);
}


module.exports ={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
 
};