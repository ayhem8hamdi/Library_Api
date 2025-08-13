const asyncHandler = require("express-async-handler");
const {Author , authorValidator} = require("../models/Author_model"); 


// Create New Author

module.exports.createNewAuthor= asyncHandler(
    async (req, res) => {
  const { error } = authorValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const newAuthor = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await newAuthor.save();
    res.status(201).json(result);}
    );


    // Get All Authors
module.exports.getAllAuthors= asyncHandler(
    async (req,rep)=>{
    let { page,authorPerPage } = req.query; 
    page = parseInt(page) || 1;     
    authorPerPage = parseInt(authorPerPage) || 10;    

    if (page < 1) page = 1;
    if (authorPerPage < 1) authorPerPage = 1;

    const skip = (page - 1) * authorPerPage;

    const authorList =await Author.find().skip(skip).limit(authorPerPage);
    rep.status(200).json(authorList); // json used instead of send to send json data
}
);


 // Get Author By Id 

 module.exports.getAuthorById= asyncHandler(async (req,rep)=>{
    const author =await Author.findById(req.params.id) ;
    if (!author) {
    return rep.status(404).json({ message: "Author not found" });
    }
    rep.status(200).json(author);
});

// Update Author

 module.exports.updateAuthorById=asyncHandler(async (req, res) => {

    const { error } = authorValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const author=await Author.findByIdAndUpdate(req.params.id,
    {
        $set:{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            nationality:req.body.nationality,
            image:req.body.image
        }
    },
    {new : true}
    );
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.status(200).json(author);
});

// Remove Author

 module.exports.deleteAuthorById= asyncHandler(async (req, res) => {
    const deletedAuthor= await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
        res.status(404).json({message:"user not found"});
    }
        res.status(200).json({ message: "Author deleted", deleted: deletedAuthor });
})