const express = require("express");
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItemById,
} = require("../controller/booksController");

// Post route for create a new book item
router.post("/create", createItem);

// create route for get all item from database.
router.get("/listAll", getAllItems);
//Retrieve a specific item by its ID.
router.get("/:id", getItemById);

//Update an existing item by ID
router.put("/:id", updateItem);

//Create Routes for Delete an item by ID
router.delete("/:id", deleteItemById);

module.exports = router;
