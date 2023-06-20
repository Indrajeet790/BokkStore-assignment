// require mongoose
const mongoose = require("mongoose");

// import logger.js
const logger = require("../utils/logger");
// mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/BookStore").then(() => {
  logger.BookLogger.info("database successfully connected");
});
