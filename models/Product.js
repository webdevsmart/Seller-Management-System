const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  img: [{
    path : String,
    date : String,
    file_name : String,
  }],
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  upc: {
    type: String,
    required: true
  },
  asin: {
    type: String,
    required: true
  },
  variation_qualities: {
    type: Array,
    "default": [],
  },
  parent_category: {
    type: Schema.Types.ObjectId,
    ref: 'product_category',
    required: true,
  },
  categories: [{type: Schema.Types.ObjectId, ref: 'product_category'}],
  retail_price: {
    type: Number,
    required: true,
  },
  square_feet: {
    type: String,
    required: true,
  },
  fullfillment_amazon: {
    type: Schema.Types.ObjectId,
    ref: 'fullfillment',
    required: true,
  },
  fullfillment_thirdparty: {
    type: Schema.Types.ObjectId,
    ref: 'fullfillment',
    required: true,
  },
  fullfillment_us: {
    type: Schema.Types.ObjectId,
    ref: 'fullfillment',
    required: true,
  },
  product_width: {
    type: String,
    required: true,
  },
  product_height: {
    type: String,
    required: true,
  },
  product_depth: {
    type: String,
    required: true,
  },
  product_grams: {
    type: String,
    required: true,
  },
  packaged_width: {
    type: String,
    required: true,
  },
  packaged_height: {
    type: String,
    required: true,
  },
  packaged_depth: {
    type: String,
    required: true,
  },
  packaged_grams: {
    type: String,
    required: true,
  },
  freight: {
    type: Schema.Types.ObjectId,
    ref: 'freight',
    required: true,
  },
  parts: [{type: Schema.Types.ObjectId, ref: 'parts'}],
  parts_qty: [Number],
  freight_qty: {
    type: Number,
    required: true,
  },
  storage: {
    type: Schema.Types.ObjectId,
    ref: 'storage',
    required: true,
  },
  storage_duration: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  fullfillment_fba_fee: {
    type: Schema.Types.ObjectId,
    ref: 'fullfillment',
    required: true,
  },
  fullfillment_type: {
    type: String,
    required: true,
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
