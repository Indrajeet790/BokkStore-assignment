const Item = require("../models/BooksModel");
const logger = require("../utils/logger");

// Create a new item in the database.
const createItem = async (req, res) => {
  try {
    const data = await Item.create(req.body);
    if (data) {
      logger.BookLogger.info("Item created successfully");
      return res.status(201).json({
        success: true,
        message: "Item created successfully",
        data,
      });
    }

    logger.BookLogger.error("Failed to create item");
    return res
      .status(400)
      .json({ success: false, message: "Failed to create item" });
  } catch (error) {
    logger.BookLogger.error("Error creating item:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createItem,
};
