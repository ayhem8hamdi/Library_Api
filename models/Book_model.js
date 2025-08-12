const mongoose=require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
    },
        author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
        description:{
        type:String,
        required:true,
        trim:true,
        minLength: 3,
    },
        price:{
        type:Number,
        required:true,
        trim:true,
        minLength: 3,
    },
    cover:{
        type:String,
        required:true,
        enum:["soft cover","hard cover"],
    }
},{timeStamp:true});


//Book Model

const Books=mongoose.model("Book",bookSchema);


// Book Validation Schema
function bookValidationSchema(obj) {
const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().length(24).hex().required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  cover: Joi.string().valid("soft cover", "hard cover").required(),
}); 
return bookSchema.validate(obj);
}

// Book Update Validation 
function bookUpdateValidationSchema(obj) {
  const bookUpdateSchema = Joi.object({
    title: Joi.string().min(3),
    author: Joi.string().length(24).hex(),
    description: Joi.string().min(3),
    price: Joi.number().positive(),
    cover: Joi.string().valid("soft cover", "hard cover"),
  })
  .min(1);  // require at least one field to update

  return bookUpdateSchema.validate(obj);
}

module.exports ={
    Books,
    bookValidationSchema,
    bookUpdateValidationSchema
};