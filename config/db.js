const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config(); // with this line our project will have the ability to read from the .env file
//Data Base Connection Function
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}


//Export Section
module.exports = {connectToDB}