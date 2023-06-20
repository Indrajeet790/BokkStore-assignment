const Item = require("../models/BooksModel");

//- Create a new item in the database.
const createItem = async (req, res) => {
  try {
    const data = await Item.create(req.body);
    if (data) {
      return res.status(201).json(data);
    }

    return res.status(400).json({
      error: "item not created",
    });
  } catch (error) {
    throw error;
  }
};

//Retrieve all book items from the database(Get all items)
const getAllItems = async (req, res) => {
  try {
    const data = await Item.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Retrieve a specific book item by its ID.
const getItemById = async (req, res) => {
  try {
    const book = await Item.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book is not found" });
    }
    res.json(book);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update an existing item by ID
const updateItem = async (req, res) => {
  try {
    const { title, author, price } = req.body;
    const bookItem = await Item.findByIdAndUpdate(
      req.params.id,
      { title, author, price },
      { new: true }
    );
    if (!bookItem) {
      return res.status(404).json({ error: "bookItem not found" });
    }
    res.json(bookItem);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete an item by ID
const deleteItemById = async (req, res) => {
  try {
    const bookItem = await Item.findByIdAndDelete(req.params.id);
    if (!bookItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItemById,
};
