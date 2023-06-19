const express = require("express");
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
} = require("../controller/booksController");

// Post route for create a new book item
router.post("/", createItem);

// create route for get all item from database.
router.get("/", getAllItems);

//Retrieve a specific item by its ID.
router.get("/:id", getItemById);

module.exports = router;
