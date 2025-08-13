const asyncHandler = require("express-async-handler");
const { Books , bookValidationSchema, bookUpdateValidationSchema} = require("../models/Book_model");



// Get All Books
module.exports.getAllBooks = asyncHandler(async (req, res) => {
  const booksList = await Books.find();
  res.status(200).json(booksList);
});



// Create New Book
module.exports.createNewBook =asyncHandler(
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
    );


//Get Book By Id 

module.exports.getBookById= asyncHandler(async (req,rep)=>{
    const book =await Books.findById(req.params.id) ;
    if (!book) {
    return rep.status(404).json({ message: "book not found" });
    }
    rep.status(200).json(book);
})



//Update Book
module.exports.updateBook= asyncHandler(async (req, res) => {

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
});


//Delete Book 
module.exports.deleteBookById = asyncHandler(async (req, res) => {
    const deletedBook= await Books.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
        res.status(404).json({message:"Book not found"});
    }
        res.status(200).json({ message: "Book deleted", deleted: deletedBook });
});