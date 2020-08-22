const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InventoryWarehouseLocationSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  short_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'warehouse_location_type',
    required: true,
  }
});

module.exports = InventoryWarehouseLocation = mongoose.model("inventory_warehouse_location", InventoryWarehouseLocationSchema);
