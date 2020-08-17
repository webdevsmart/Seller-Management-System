const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PartsSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'parts_type',
    required: true,
  },
  cost_usd: {
    type: String,
    required: true,
  },
  UM: {
    type: Schema.Types.ObjectId,
    ref: 'parts_um',
    required: true,
  },
  qty: {
      type: String,
      required: true,
  },
  supplier_id: {
    type: Schema.Types.ObjectId,
    ref: 'supplier',
    required: true,
  }
});

module.exports = Parts = mongoose.model("parts", PartsSchema);
