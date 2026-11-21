/**
 * Posts router (mounted at /posts in app.js).
 *
 * The auditWrite middleware is applied only to POST requests so public reads
 * do not generate write-audit log entries.
 */

const express = require('express');
const router = express.Router();

const auditWrite = require('../middleware/auditWrite');

const posts = [{ id: 1, title: 'Hello World' }];

// Public read — no extra middleware.
router.get('/', (req, res) => {
  res.json({ data: posts });
});

// Audit writes only when a post is created.
router.post('/', auditWrite, (req, res) => {
  const post = { id: posts.length + 1, title: req.body.title || 'Untitled' };
  posts.push(post);
  res.status(201).json({ data: post });
});

module.exports = router;
