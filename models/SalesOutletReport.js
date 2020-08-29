const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SalesOutletReportSchema = new Schema({
  ID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  sales_outlet: {
    type: Schema.Types.ObjectId,
    ref: "sales_outlet",
    required: true,
  },
  submitted_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  editted_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  modified_at: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  }
});

module.exports = SalesOutletReport = mongoose.model("sales_outlet_report", SalesOutletReportSchema);
