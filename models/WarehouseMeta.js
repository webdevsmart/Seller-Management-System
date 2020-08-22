const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WarehouseMetaSchema = new Schema({
  inventory_warehouse: {
    type: Schema.Types.ObjectId,
    ref: 'inventory_warehouse',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  warehouse: {
    type: Number,
    required: true,
  },
  warehouse_inbound: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = WarehouseMeta = mongoose.model("warehouse_meta", WarehouseMetaSchema);
