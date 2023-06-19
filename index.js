const express = require("express");
const app = express();
const PORT = 8000;

// database connection
const DbConnection = require("./config/DbConnection");

// use middleware for parsing data from body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require router
const itemRoutes = require("./Router/itemRoutes");

// Routes
app.use("/api/items", itemRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log("server is not running on port");
  } else {
    console.log(`server running on port ${PORT}`);
  }
});
