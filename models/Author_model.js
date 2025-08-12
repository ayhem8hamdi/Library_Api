const mongoose=require("mongoose");
const joi = require("joi");


//Defenition of Author Collection(Table) Structure

const AuthorSchema= new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true,
        minLength: 3,
    },
    lastName:{
        type:String,
        trim:true,
        required:true,
        minLength: 3,
    },
    nationality:{
        type:String,
        trim:true,
        required:true,
        minLength: 2,
    },
    image:{
        type:String,
        trim:true,
        default:'avatar.png'
    },
},
{
    timestamps:true
}
);



// author validation method 
function authorValidator(obj) {
  const authorSchema = joi.object({
    firstName: joi.string().min(2).max(30).required(),
    lastName: joi.string().min(2).max(30).required(),
    nationality: joi.string().min(2).max(50).required(),
    image: joi.string().uri().optional().allow(""), 
  });

  return authorSchema.validate(obj);
}

const Author = mongoose.model("Author",AuthorSchema); // "Author" : is the model name
module.exports ={
    Author,
    authorValidator
} ;
