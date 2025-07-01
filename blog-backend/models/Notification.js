const pool = require('../config/db');

const Notification = {
  
  async create({ senderId, receiverId, postId, type, message }) {
    const result = await pool.query(
      `INSERT INTO notifications (sender_id, receiver_id, post_id, type, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [senderId, receiverId, postId, type, message]
    );
    return result.rows[0];
  },

  async getUserNotifications(userId) {
    const result = await pool.query(
      `SELECT * FROM notifications
       WHERE receiver_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async markAsRead(notificationId) {
    const result = await pool.query(
      `UPDATE notifications
       SET is_read = TRUE
       WHERE id = $1
       RETURNING *`,
      [notificationId]
    );
    return result.rows[0];
  }
};

module.exports = Notification;
