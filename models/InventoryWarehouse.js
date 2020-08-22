const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InventoryWarehouseSchema = new Schema({
  warehouse_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  submitted_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = InventoryWarehouse = mongoose.model("inventory_warehouse", InventoryWarehouseSchema);
