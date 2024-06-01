const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Content = require("../model/Content");

router.post('/save-content', async (req, res) => {
  const { content, title, slug } = req.body
  const newContent = new Content({ content, title, slug });
  try {
    const saveContent = await newContent.save();
    res.status(200).json(saveContent);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get("/", async (req, res) => {
  try {
    const posts = await Content
      .find()
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get single posts by slug
router.get("/:slug", async (req, res) => {
  try {
    const post = await Content.findOne({ slug: req.params.slug }).lean();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update posts
router.put("/:slug", async (req, res) => {
  try {
    const updatedPost = await Content.findByIdAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router