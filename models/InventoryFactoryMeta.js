const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InventoryFactoryMetaSchema = new Schema({
  inventory_factory: {
    type: Schema.Types.ObjectId,
    ref: 'inventory_warehouse',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  ready_to_ship: {
    type: Number,
    required: true,
  },
  in_production: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = InventoryFactoryMeta = mongoose.model("inventory_factory_meta", InventoryFactoryMetaSchema);
