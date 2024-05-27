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

module.exports = router