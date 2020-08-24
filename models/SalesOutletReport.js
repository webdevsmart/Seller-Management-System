const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SalesOutletReportSchema = new Schema({
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
  modified_at: {
    type: Date,
    default: new Date(),
    required: true,
  },
  create_at: {
      type: Date,
      default: new Date(),
      required: true,
  }
});

module.exports = SalesOutletReport = mongoose.model("sales_outlet_report", SalesOutletReportSchema);
