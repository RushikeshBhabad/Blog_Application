const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');

// GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
});

// POST /api/posts
router.post('/', async (req, res, next) => {
  try {
    const { title, content, author, tags, coverImage } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Please provide title and content' });
    }

    const post = await Post.create({
      title,
      content,
      author: author || 'Anonymous',
      tags: tags || [],
      coverImage: coverImage || ''
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/posts/:id/like
router.patch('/:id/like', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post.likes });
  } catch (err) {
    next(err);
  }
});

module.exports = router;