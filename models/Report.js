const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReportSchema = new Schema({
  report_type: {
    type: String,
    requried: true,
  },
  model_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = Report = mongoose.model("reports", ReportSchema);
