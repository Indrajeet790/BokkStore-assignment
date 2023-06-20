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
// // Retrieve a specific book item by its ID.
const getItemById = async (req, res) => {
  try {
    const book = await Item.findById(req.params.id);
    if (!book) {
      logger.BookLogger.error("Book not found");
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    logger.BookLogger.info("Book retrieved successfully");
    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      book,
    });
  } catch (error) {
    logger.BookLogger.error("Error retrieving book:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
};
// // Update an existing item by ID.
const updateItem = async (req, res) => {
  try {
    const { title, author, price } = req.body;
    const bookItem = await Item.findByIdAndUpdate(
      req.params.id,
      { title, author, price },
      { new: true }
    );
    if (!bookItem) {
      logger.BookLogger.error("Item not found");
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    logger.BookLogger.info("Item updated successfully");
    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      bookItem,
    });
  } catch (error) {
    logger.BookLogger.error("Error updating item:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
};
// // Delete an item by ID.
const deleteItemById = async (req, res) => {
  try {
    const bookItem = await Item.findByIdAndDelete(req.params.id);
    if (!bookItem) {
      logger.BookLogger.error("Item not found");
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    logger.BookLogger.info("Item deleted successfully");
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    logger.BookLogger.error("Error deleting item:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItemById,
};
