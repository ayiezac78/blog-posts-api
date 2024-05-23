const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../model/Posts");

//create a posts data
router.post("/create_post", async (req, res) => {
  try {
    const savedPost = await Post.create(req.body);
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post
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
    const post = await Post.findOne({ slug: req.params.slug }).lean();
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
    const updatedPost = await Post.findByIdAndUpdate(
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