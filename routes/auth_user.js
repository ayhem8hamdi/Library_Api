const express = require("express");
const router= express.Router();
const {User, validateRegisterUser, validateLoginUser} = require("../models/User_model"); 
const asyncHandler= require("express-async-handler");
const {hashPassword , comparePasswords} = require("../Helper/password_hashing");;
const {blockNonAdminFromSettingIsAdmin}=require("../middlewares/verify_token");





/* 
    * @desc Register New User 
    * @route /api/auth/register
    * @method POST
    * @acces Public
*/

router.post("/register",blockNonAdminFromSettingIsAdmin,asyncHandler(
   async (req,res)=>{
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({email : req.body.email});
    if (user) {
        res.status(400).json({
            message : "User Already Exists"
        });
        return;
    }
    req.body.password=await  hashPassword(req.body.password); 
    const newUser=new User({
      userName:req.body.userName,
      email:req.body.email,
      password:req.body.password,

    });
    const result = await newUser.save();
     const token = newUser.generateToken();
    const {password, ...others}= result._doc;
    res.status(201).json({...others , token : token});

    }
));




/* 
    * @desc Login New User 
    * @route /api/auth/login
    * @method POST
    * @acces Public
*/

router.post("/login",blockNonAdminFromSettingIsAdmin,asyncHandler(
   async (req,res)=>{
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({email : req.body.email});
    if (!user) {
        res.status(400).json({
            message : "Email Or Password Are Incorrect"
        });
        return;
    } 
    const isPasswordMatch=await  comparePasswords(req.body.password,user.password); 
    if (!isPasswordMatch) {
                res.status(400).json({
            message : "Email Or Password Are Incorrect"
        });
        return; 
    }
    const token = user.generateToken();
     const { password, ...others } = user._doc;
     res.status(200).json({...others , token : token});

    }
));
 

module.exports = router