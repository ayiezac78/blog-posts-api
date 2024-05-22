const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  slug: String,
  title: String,
}, { timestamps: true });

module.exports = mongoose.model("Posts", PostSchema);