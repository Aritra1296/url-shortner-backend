const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique : true,
    index : true
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortid.generate,
  },
});

module.exports = mongoose.model("Url", urlSchema);
