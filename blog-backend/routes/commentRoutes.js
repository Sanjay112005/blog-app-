const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController')
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, commentController.createComment);


router.get('/:postId', commentController.getCommentsByPostId);


router.get('/', verifyToken, commentController.getAllComments);


router.delete('/:commentId', verifyToken, commentController.deleteComment);

module.exports = router;
