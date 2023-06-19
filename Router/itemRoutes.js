const express = require("express");
const router = express.Router();
const { createItem } = require("../controller/booksController");

// Post route for create a new book item
router.post("/", createItem);

module.exports = router;
