//Import Packages

const express = require("express");
const router= express.Router();
const {verifyTokenValidity,isAuthorized,blockNonAdminFromSettingIsAdmin,hasAdminAcces}=require("../middlewares/verify_token");
const {updateUser,getAllUsers,getUserById,deleteUserById}= require("../controllers/users_controller");


//Routes 

/* 
    * @desc Update User 
    * @route /api/update/:id
    * @method PUT
    * @acces private
*/
router.put("/:id",verifyTokenValidity,isAuthorized,blockNonAdminFromSettingIsAdmin,updateUser);
/* 
    * @desc Get All Users 
    * @route /api/users/getAllUsers
    * @method Get
    * @acces private
*/
router.get("/getAllUsers",verifyTokenValidity,hasAdminAcces,getAllUsers);
/* 
    * @desc Get User By Id
    * @route /api/users/getuserById/:id
    * @method Get
    * @acces private (only user himself or admin)
*/
router.get("/getUserById/:id",verifyTokenValidity,isAuthorized,getUserById);
/* 
    * @desc Delete User By Id
    * @route /api/users/deleteUserById/:id
    * @method Delete
    * @acces private (only user himself or admin)
    * Protected Route
*/
router.delete("/deleteUserById/:id",verifyTokenValidity,isAuthorized,deleteUserById);


// Exports router
module.exports = router;