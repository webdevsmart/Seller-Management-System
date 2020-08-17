const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SupplierTypeSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

module.exports = SupplierType = mongoose.model("supplier_type", SupplierTypeSchema);
