// models/Post.js
const pool = require('../config/db');

const Post = {
  // Create a new blog post
  async createPost(userId, title, content, imageUrl, tags = []) {
    const result = await pool.query(
      `INSERT INTO posts (user_id, title, content, image_url, tags)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, title, content, imageUrl, tags]
    );
    return result.rows[0];
  },

  async getPostsByUser(userId) {
  const result = await pool.query(
    `SELECT 
  posts.*, 
  users.name AS author_name,
  posts.views,
  COUNT(DISTINCT comments.id) AS comment_count,
  ROUND(AVG(ratings.rating), 1) AS avg_rating
FROM posts
JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON comments.post_id = posts.id
LEFT JOIN ratings ON ratings.post_id = posts.id
WHERE posts.user_id = $1
GROUP BY posts.id, users.name
ORDER BY posts.created_at DESC;
`,
    [userId]
  );
  return result.rows;
},

async incrementViews(postId) {
  await pool.query(
    `UPDATE posts SET views = views + 1 WHERE id = $1`,
    [postId]
  );
},
  // Get all posts with author name (JOIN users)
  async getAllPosts() {
    const result = await pool.query(
      `SELECT posts.*,  users.name AS author_name
       FROM posts
       JOIN users ON posts.user_id = users.id
       ORDER BY posts.created_at DESC`
    );
    return result.rows;
  },

  // Get a single post by ID with author name
  async getPostById(postId) {
    const result = await pool.query(
     `SELECT posts.*, users.name AS author_name
       FROM posts
       JOIN users ON posts.user_id = users.id
       WHERE posts.id = $1`,
      [postId]
    );
    return result.rows[0];
  },

  // Update a blog post
  async updatePost(postId, title, content, imageUrl, tags) {
    const result = await pool.query(
      `UPDATE posts
       SET title = $1,
           content = $2,
           image_url = $3,
           tags = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [title, content, imageUrl, tags, postId]
    );
    return result.rows[0];
  },

  // Delete a post by ID
  async deletePost(postId) {
    const result = await pool.query(
      `DELETE FROM posts
       WHERE id = $1
       RETURNING *`,
      [postId]
    );
    return result.rows[0];
  }
};

module.exports = Post;
