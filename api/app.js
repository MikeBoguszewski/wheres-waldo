require("dotenv").config();
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const Character = require("./models/character");
const Score = require("./models/score");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
app.use(express.json());
app.use(cors());

app.get(
  "/levels/:level",
  asyncHandler(async (req, res, next) => {
    const level = await Character.find({ level: req.params.level });
    res.json(level);
  })
);

app.get(
  "/scores/:level",
  asyncHandler(async (req, res, next) => {
    const scores = await Score.find({ level: req.params.level });
    res.json(scores);
  })
);

app.post(
  "/scores/:level",
  asyncHandler(async (req, res, next) => {
    try {
      const result = await Score.updateOne({ level: req.params.level }, { $push: { scores: {name: req.body.name, time: req.body.time} } });
      res.status(200).json({ message: "Score added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
