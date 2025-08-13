// Import Packages
const express = require("express");
const router= express.Router();
const {hasAdminAcces,verifyTokenValidity} = require("../middlewares/verify_token");
const { getAllBooks,createNewBook,getBookById,updateBook,deleteBookById} = require("../controllers/book_controller");



// POST - Create New Book
router.post("/",verifyTokenValidity,hasAdminAcces, createNewBook);
// Get ALl Books 
router.get("/",getAllBooks);
// GET Book by ID
router.get("/:id",getBookById);
// PUT - Update Author
router.put("/:id",verifyTokenValidity,hasAdminAcces,updateBook);
// DELETE - Remove Book
router.delete("/:id",verifyTokenValidity,hasAdminAcces, deleteBookById);


//Book Route export
module.exports = router;






