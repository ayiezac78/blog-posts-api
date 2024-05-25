const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  slug: String,
  title: String,
  sypnosis: String,
  content: [String],
  tags: [String],
  images: [ImageSchema],
}, { timestamps: true });

module.exports = mongoose.model("Posts", PostSchema);