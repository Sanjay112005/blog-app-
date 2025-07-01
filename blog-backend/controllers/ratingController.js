const Rating = require('../models/Rating')

const ratingController = {
 
  async ratePost(req, res) {
    const { postId, rating } = req.body;
    const userId = req.user.id;

    if (!postId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Post ID and valid rating (1-5) are required' });
    }
     try {
      const rated = await Rating.ratePost(postId, userId, rating);
      res.status(201).json({ message: 'Rating submitted successfully', rating: rated });
    } catch (err) {
      console.error('Rating error:', err.message);
      res.status(500).json({ error: 'Failed to rate post' });
    }
  },

  async getAverageRating(req, res) {
    const postId = req.params.postId;

    try {
      const avgRating = await Rating.getAverageRating(postId);
      res.status(200).json({ postId, averageRating: avgRating });
    } catch (err) {
      console.error('Avg rating error:', err.message);
      res.status(500).json({ error: 'Failed to get average rating' });
    }
  },


  async getUserRating(req, res) {
    const postId = req.params.postId;
    const userId = req.user.id;

    try {
      const userRating = await Rating.getUserRating(postId, userId);
      res.status(200).json({ postId, userRating });
    } catch (err) {
      console.error('User rating error:', err.message);
      res.status(500).json({ error: 'Failed to get user rating' });
    }
  },
async getPostRating(req, res) {
  const postId = req.params.postId;
  const userId = req.user?.id;

  try {
    const averageRating = await Rating.getAverageRating(postId); // ✅ use your model
    const userRating = userId
      ? await Rating.getUserRating(postId, userId)
      : 0;

    res.status(200).json({
      postId,
      averageRating: parseFloat(averageRating),
      userRating: parseInt(userRating) || 0,
    });
  } catch (err) {
    console.error('Error fetching rating:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
,
};
module.exports = ratingController;
