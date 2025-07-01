const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

// Routes
router.post('/', verifyToken, postController.createPost);

router.get('/', postController.getAllPosts);

router.get('/user/:userId', postController.getPostsByUser);

router.get('/:id', postController.getPostById);

// ✅ FIXED: use postController (not PostController)
// routes/posts.js
router.post('/:id/view', postController.incrementViewCount);


router.put('/:id', verifyToken, postController.updatePost);

router.delete('/:id',verifyToken, postController.deletePost);

module.exports = router;
