const pool = require('../config/db');

const comment = {
    async createComment(postId, userId, content) {
    const result = await pool.query(
        `INSERT INTO comments (post_id, user_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
       [postId, userId, content ]
    )
    return result .rows[0]

    },

    async getCommentsByPostId(postId) {
    const result = await pool.query(
      `SELECT comments.*, users.name AS author_name
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.post_id = $1
       ORDER BY comments.created_at DESC`,
      [postId]
    );
    return result.rows;
  },

   async deleteComment(commentId) {
    const result = await pool.query(
      `DELETE FROM comments WHERE id = $1 RETURNING *`,
      [commentId]
    );
    return result.rows[0];
  },

//   async getAllComments() {
//   const result = await pool.query(
//     `SELECT id, content, author_name, post_id, created_at 
//      FROM comments 
//      ORDER BY created_at DESC`
//   );
//   return result.rows;
// }


  
  async getAllComments() {
    const result = await pool.query(
      `SELECT comments.*, users.name AS author_name, posts.title AS post_title
       FROM comments
       JOIN users ON comments.user_id = users.id
       JOIN posts ON comments.post_id = posts.id
       ORDER BY comments.created_at DESC`
    );
    return result.rows;
  }
};

module.exports = comment;