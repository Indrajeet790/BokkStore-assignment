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
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Retrieve a specific item by its ID.
const getItemById = async (req, res) => {
  try {
    const book = await Item.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book is not found" });
    }
    res.json(book);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
};
