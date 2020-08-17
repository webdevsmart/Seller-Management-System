const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SupplierSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  start_date: {
      type: Date,
      default: Date.now
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'supplier_type',
    required: true,
  },
  country: {
      type: String,
      required: true,
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  skype: {
    type: String,
    required: true
  },
  wechat: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  office: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  main_products_services: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});

module.exports = Supplier = mongoose.model("supplier", SupplierSchema);
