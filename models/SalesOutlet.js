const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SalesOutletSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  short_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: 'inventory_warehouse_location',
    required: true,
  },
});

module.exports = SalesOutlet = mongoose.model("sales_outlet", SalesOutletSchema);
