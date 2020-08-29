const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InventoryFactorySchema = new Schema({
  ID: {
    type: String,
    requried: true,
  },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: 'inventory_warehouse_location',
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  editted_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  submitted_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  modified_at: {
    type: Date,
    required: true,
  },
});

module.exports = InventoryFactory = mongoose.model("inventory_factory", InventoryFactorySchema);
