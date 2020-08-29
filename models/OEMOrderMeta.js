const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OEMOrderMetaSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  oem_order: {
    type: Schema.Types.ObjectId,
    ref: 'oem_order',
    required: true,
  },
  warehouse_qty: {
      type: Number,
      required: true,
  },
  order_qty: {
      type: Number,
      required: true,
  }
});

module.exports = OEMOrderMeta = mongoose.model("oem_order_meta", OEMOrderMetaSchema);
