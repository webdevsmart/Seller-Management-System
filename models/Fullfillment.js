const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FullfillmentSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rate: {
    type: String,
    required: true
  },
  UM: {
    type: Schema.Types.ObjectId,
    ref: 'parts_um',
    required: true,
  },
});

module.exports = Fullfillment = mongoose.model("fullfillment", FullfillmentSchema);
