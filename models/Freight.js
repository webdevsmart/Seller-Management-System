const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FreightSchema = new Schema({
  ID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cost_usd: {
    type: String,
    required: true
  },
  UM: {
    type: Schema.Types.ObjectId,
    ref: 'parts_um',
    required: true,
  },
});

module.exports = Freight = mongoose.model("freight", FreightSchema);
