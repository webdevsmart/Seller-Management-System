const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PartsUMSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  short_name: {
    type: String,
    required: true
  },
});

module.exports = PartsUM = mongoose.model("parts_um", PartsUMSchema);
