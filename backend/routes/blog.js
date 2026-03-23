const express = require('express');
const router = express.Router();
const blogPosts = require('../data/blogPosts');

router.get('/', (req, res) => {
  res.json(blogPosts);
});

router.get('/:id', (req, res) => {
  const post = blogPosts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post não encontrado' });
  }
  res.json(post);
});

module.exports = router;
