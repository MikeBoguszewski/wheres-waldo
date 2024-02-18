const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const characterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true},
  coordinates: {
    type: {
      minX: {
        type: Number,
        required: true,
      },
      maxX: {
        type: Number,
        required: true,
      },
      minY: {
        type: Number,
        required: true,
      },
      maxY: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
});

module.exports = mongoose.model("Character", characterSchema)
