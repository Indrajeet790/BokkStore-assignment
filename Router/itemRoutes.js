const express = require("express");
const router = express.Router();
const { createItem, getAllItems } = require("../controller/booksController");

// Post route for create a new book item
router.post("/", createItem);

// create route for get all item from database.
router.get("/", getAllItems);

module.exports = router;
