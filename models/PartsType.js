const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PartsTypeSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

module.exports = PartsType = mongoose.model("parts_type", PartsTypeSchema);
