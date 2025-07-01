const express = require('express');
const router = express.Router();    

const ratingController = require('../controllers/ratingController');
const verifyToken = require('../middleware/authMiddleware')

router.post('/', verifyToken, ratingController.ratePost);
// router.get('/:postId', ratingController.getAverageRating);
// router.get('/user/:postId', verifyToken, ratingController.getUserRating);
router.get('/:postId', verifyToken, ratingController.getPostRating); 

module.exports = router;