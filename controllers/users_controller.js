const asyncHandler = require("express-async-handler"); 
const {User,validateUpdateUser}=require("../models/User_model");
const {hashPassword} = require("../Helper/password_hashing");


module.exports.updateUser = asyncHandler(
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
);


module.exports.getAllUsers = asyncHandler(
  async (req,res)=>{
    const users= await User.find().select("-password");
   res.status(200).json(users);
  }
);


module.exports.getUserById = asyncHandler(
  async (req,res)=>{
    const user= await User.findById(req.params.id).select("-password");
    if (!user) {

     return res.status(404).json({message : "verify the id"});
    }
   res.status(200).json(user);
  }
);


module.exports.deleteUserById = asyncHandler(
  async (req,res)=>{
    const user= await User.findByIdAndDelete(req.params.id).select("-password");
    if (!user) {
     return res.status(404).json({message : "verify the id"});
    }
   res.status(200).json({message: "User Succefully deleted" ,  user});
  }
);