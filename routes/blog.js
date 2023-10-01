const express = require('express');
const router = express.Router();

const { allBlogs, searchBlog } = require('../controllers/blog');

router.get('/blog-stats', allBlogs);
router.get('/blog-search/:query', searchBlog);

module.exports = router;
