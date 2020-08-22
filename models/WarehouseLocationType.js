const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WarehouseLocationTypeSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

module.exports = WarehouseLocationType = mongoose.model("warehouse_location_type", WarehouseLocationTypeSchema);
