const express = require('express');
const app = express();
require("dotenv").config();// with this line our project will have the ability to read from the .env file
const logger = require("./middlewares/logger");
const {errorHandler , notFoundHandler} = require("./middlewares/errors");
const {connectToDB}=require("./config/db");

// DataBase Connection 
connectToDB();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/authors", require("./routes/authors"));
app.use("/api/books", require("./routes/books"));
app.use("/api/auth",  require("./routes/auth_user"));
app.use("/api/users", require("./routes/users"));

// Error + Not Found Handler
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});












