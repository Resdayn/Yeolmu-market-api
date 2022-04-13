const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 30,
  },
  title: {
    type: String,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
    min: 10,
    max: 600,
  },
});

itemSchema.set("timestamps", true);

module.exports = mongoose.model("Item", itemSchema);
