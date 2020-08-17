const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductCategorySchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
});

module.exports = ProductCategory = mongoose.model("product_category", ProductCategorySchema);
