const pool = require('../config/db')

const Rating = {

  async ratePost(postId, userId, rating) {
    
    const result = await pool.query(
      `INSERT INTO ratings (post_id, user_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (post_id, user_id)
       DO UPDATE SET rating = EXCLUDED.rating, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [postId, userId, rating]
    );
    return result.rows[0];
  },

  async getAverageRating(postId) {
    const result = await pool.query(
      `SELECT AVG(rating)::numeric(2,1) AS average_rating
       FROM ratings
       WHERE post_id = $1`,
      [postId]
    );
    return result.rows[0].average_rating || 0;
  },

 
  async getUserRating(postId, userId) {
    const result = await pool.query(
      `SELECT rating FROM ratings WHERE post_id = $1 AND user_id = $2`,
      [postId, userId]
    );
    return result.rows[0]?.rating || null;
  }
};

module.exports = Rating;
