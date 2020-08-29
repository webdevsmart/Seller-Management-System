const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OEMOrderSchema = new Schema({
  ID: {
    type: String,
    requried: true,
  },
  date: {
    type: Date,
    required: true,
  },
  forecast_type: {
     type: String,
     required: true,
  },
  selected_country: {
      type: String,
  },
  selected_region: {
      type: String,
  },
  selected_type: {
    type: Schema.Types.ObjectId,
    ref: 'warehouse_location_type'
  },
  selected_warehouse: {
    type: Schema.Types.ObjectId,
    ref: 'inventory_warehouse_location'
  },
  warehouse_for_qty: {
    type: Schema.Types.ObjectId,
    ref: 'inventory_warehouse_location'
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
    default: Date.now(),
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = OEMOrder = mongoose.model("oem_order", OEMOrderSchema);
