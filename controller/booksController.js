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
// // Get all items with pagination.
const getAllItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10 if not specified

    const startIndex = (page - 1) * limit;
    const items = await Item.find().skip(startIndex).limit(limit);
    const totalItems = await Item.countDocuments();

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems: totalItems,
    };

    logger.BookLogger.info("Items retrieved successfully");
    return res.status(200).json({
      success: true,
      message: "Items retrieved successfully",
      items,
      pagination,
    });
  } catch (error) {
    logger.BookLogger.error("Error retrieving items:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
};
