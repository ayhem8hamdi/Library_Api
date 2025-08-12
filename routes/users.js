const express = require("express");
const router= express.Router();
const asyncHandler= require("express-async-handler");
const {hashPassword} = require("../Helper/password_hashing");
const {User, validateUpdateUser }= require("../models/User_model");
const {verifyTokenValidity,isAuthorized,blockNonAdminFromSettingIsAdmin,hasAdminAcces}=require("../middlewares/verify_token");

/* 
    * @desc Update User 
    * @route /api/update/:id
    * @method PUT
    * @acces private
*/
router.put("/:id",verifyTokenValidity,isAuthorized,blockNonAdminFromSettingIsAdmin,asyncHandler(
  async (req,res)=>{
   const { error }=validateUpdateUser(req.body);
   if (error) {
    return res.status(400).json({ message: error.details[0].message });
   }
   if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
   }
   const updatedUser= await User.findByIdAndUpdate(req.params.id,
    {
      $set:{
        email:req.body.email,
        password:req.body.password,
        userName: req.body.userName,
      }
    },
    {new:true}
   ).select("-password");

   res.status(200).json(updatedUser);
  }
));



/* 
    * @desc Get All Users 
    * @route /api/users/getAllUsers
    * @method Get
    * @acces private
*/
router.get("/getAllUsers",verifyTokenValidity,hasAdminAcces,asyncHandler(
  async (req,res)=>{
    const users= await User.find().select("-password");
   res.status(200).json(users);
  }
));


/* 
    * @desc Get User By Id
    * @route /api/users/getuserById/:id
    * @method Get
    * @acces private (only user himself or admin)
*/
router.get("/getUserById/:id",verifyTokenValidity,isAuthorized,asyncHandler(
  async (req,res)=>{
    const user= await User.findById(req.params.id).select("-password");
    if (!user) {

     return res.status(404).json({message : "verify the id"});
    }
   res.status(200).json(user);
  }
));


/* 
    * @desc Delete User By Id
    * @route /api/users/deleteUserById/:id
    * @method Delete
    * @acces private (only user himself or admin)
    * Protected Route
*/
router.delete("/deleteUserById/:id",verifyTokenValidity,isAuthorized,asyncHandler(
  async (req,res)=>{
    const user= await User.findByIdAndDelete(req.params.id).select("-password");
    if (!user) {
     return res.status(404).json({message : "verify the id"});
    }
   res.status(200).json({message: "User Succefully deleted" ,  user});
  }
));






// Exports router
module.exports = router;