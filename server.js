const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');

// Import Routes
const authenticationRoute = require("./routes/authentication");

// Initialize dotenv
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("Connection to MongoDB successful");
    // Listening for requests if db connection successful
    app.listen(3000, () => console.log("Server Listening on port 3000..."));
  })
  .catch((error) => console.log(error));

// Middlewares
app.use(express.json()); // To accept json post requests

// Routes Middlewares
app.use(cors());
app.use("/api/user", authenticationRoute);