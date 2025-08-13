const express = require("express");
const router= express.Router();
exports.router = router;
const {hasAdminAcces,verifyTokenValidity} = require("../middlewares/verify_token");
const {createNewAuthor,getAllAuthors,getAuthorById,updateAuthorById,deleteAuthorById}=require("../controllers/authors_controller");



// POST - Create New Author
router.post("/",verifyTokenValidity,hasAdminAcces,createNewAuthor);
// Get ALl Author 
router.get("/",getAllAuthors);
// GET Author by ID
router.get("/:id",getAuthorById);
// PUT - Update Author
router.put("/:id",verifyTokenValidity,hasAdminAcces,updateAuthorById);
// DELETE - Remove Author
router.delete("/:id",verifyTokenValidity,hasAdminAcces,deleteAuthorById );



module.exports = router;
