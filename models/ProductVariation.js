const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductVariationSchema = new Schema({
  unique_id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
});

module.exports = ProductVariation = mongoose.model("product_variation", ProductVariationSchema);
