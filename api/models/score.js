const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scoreSchema = new Schema({
  level: { type: Number, required: true },
  scores: [
    {
      name: { type: String, required: true },
      time: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Score", scoreSchema);
