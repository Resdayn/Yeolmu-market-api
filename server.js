const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Item = require("./model/Item"); // Import dummy data
const cors = require("cors");
const verifyToken = require("./routes/verifyToken");

// Import Routes
const authenticationRoute = require("./routes/authentication");
const itemRoute = require("./routes/item");

// Initialize dotenv
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    user: "admin",
    pass: "password",
  })
  .then((result) => {
    console.log("Connection to MongoDB successful");
    // Listening for requests if db connection successful
    app.listen(3000, () => console.log("Server Listening on port 3000..."));

    // Importing dummy data to the db
    const items = require("./mongodb-initdb/items");
    Item.collection
      .insertMany(items)
      .then(() => console.log("Items Dummy Data inserted")) // Success)
      .catch(function (error) {
      });
  })
  .catch((error) => console.log(error));

// Middlewares
app.use(express.json()); // To accept json post requests

// Routes Middlewares
app.use(cors());
app.use("/api/user", authenticationRoute);
app.use("/api/item", itemRoute);

// Protected TEST routes
app.get("/api/protected", verifyToken, (request, response) => {
  const userId = request.user._id;
  response.send(`USER ${userId} CONFIRMED. PROTECTED ROUTE ACCESSED`);
});