const express = require("express");
const router= express.Router();
const {Books, bookValidationSchema, bookUpdateValidationSchema} = require("../models/Book_model"); 
const asyncHandler= require("express-async-handler");

const {hasAdminAcces,verifyTokenValidity} = require("../middlewares/verify_token");


// POST - Create New Book

router.post("/",verifyTokenValidity,hasAdminAcces, asyncHandler(
    async (req, res) => {
  const { error } = bookValidationSchema(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const newBook = new Books({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await newBook.save();
    res.status(201).json(result);}
    ));



/////////////////////////////////////////////////////////////////




// Get ALl Books 

router.get("/",asyncHandler(
    async (req,rep)=>{
    const booksList =await Books.find();
    rep.status(200).json(booksList); // json used instead of send to send json data
}
));



/////////////////////////////////////////////////////////////////





// GET Book by ID

router.get("/:id",asyncHandler(async (req,rep)=>{
    const book =await Books.findById(req.params.id) ;
    if (!book) {
    return rep.status(404).json({ message: "book not found" });
    }
    rep.status(200).json(book);
}));


  
    
/////////////////////////////////////////////////////////////////






// PUT - Update Author
router.put("/:id",verifyTokenValidity,hasAdminAcces,asyncHandler(async (req, res) => {

    const { error } = bookUpdateValidationSchema(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const book=await Books.findByIdAndUpdate(req.params.id,
    {
        $set:{
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            description:req.body.description,
            cover:req.body.cover
        }
    },
    {new : true}
    );
  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }
  res.status(200).json(book);

  
}));




/////////////////////////////////////////////////////////////////






// DELETE - Remove Book
router.delete("/:id",verifyTokenValidity,hasAdminAcces, asyncHandler(async (req, res) => {
    const deletedBook= await Books.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
        res.status(404).json({message:"Book not found"});
    }
        res.status(200).json({ message: "Book deleted", deleted: deletedBook });
}));




//Book Route export

module.exports = router;
