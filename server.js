const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Url = require("./models/url");
const cors = require("cors");
require("dotenv/config");

//CORS CONFIGURE
app.use(express.json());
app.use(
  cors({
    origin: [process.env.ALLOW_DOMAIN],
    credentials: true,
  })
);

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", function () {
  console.log("Successfully connected to MongoDB!");
});

//HOW TO START LISTENING TO SERVER
app.listen(process.env.PORT, () =>
  console.log(`app started on port: ${process.env.PORT}`)
);

app.get("/", async (req, res) => {
  const allurls = await Url.find();
  res.json(allurls);
});

app.post("/shortUrl", async (req, res) => {
  const url = new Url({
    fullUrl: req.body.fullUrl,
    userId: req.body.userId,
  });
  await url.save();
  res.sendStatus(200);
});

app.get("/:shortUrl", async (req, res) => {
  const data = await Url.findOne({ shortUrl: req.params.shortUrl });
  if (data == null) return res.sendStatus(404);
  res.redirect(data.fullUrl);
  res.json(data);
});
