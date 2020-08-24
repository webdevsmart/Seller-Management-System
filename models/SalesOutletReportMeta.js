const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SalesOutletReportMetaSchema = new Schema({
  sold: {
    type: Number,
    required: true
  },
  returned: {
    type: Number,
    required: true
  },
  refunded: {
    type: Number,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  sales_outlet_report: {
    type: Schema.Types.ObjectId,
    ref: 'sales_outlet_report',
    required: true,
  }
});

module.exports = SalesOutletReportMeta = mongoose.model("sales_outlet_report_meta", SalesOutletReportMetaSchema);
