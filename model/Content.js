const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  slug: String,
  title: String,
  content: String
}, { timestamps: true });

module.exports = mongoose.model("Content", ContentSchema)