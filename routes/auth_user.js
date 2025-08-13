const express = require("express");
const router= express.Router();
const {blockNonAdminFromSettingIsAdmin}=require("../middlewares/verify_token");
const {registerUser,loginUser} = require("../controllers/auth_controller");


/* 
    * @desc Register New User 
    * @route /api/auth/register
    * @method POST
    * @acces Public
*/
router.post("/register",blockNonAdminFromSettingIsAdmin,registerUser);
/* 
    * @desc Login New User 
    * @route /api/auth/login
    * @method POST
    * @acces Public
*/
router.post("/login",blockNonAdminFromSettingIsAdmin,loginUser);
 

module.exports = router