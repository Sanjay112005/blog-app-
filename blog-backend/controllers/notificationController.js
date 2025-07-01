const Notification = require('../models/Notification');

const notificationController = {
 
  async getNotifications(req, res) {
    const userId = req.user.id;

    try {
      const notifications = await Notification.getUserNotifications(userId);
      res.status(200).json(notifications);
    } catch (err) {
      console.error('Error fetching notifications:', err.message);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  },

  async markAsRead(req, res) {
    const { notificationId } = req.params;

    try {
      const updated = await Notification.markAsRead(notificationId);
      if (!updated) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.status(200).json({ message: 'Marked as read', notification: updated });
    } catch (err) {
      console.error('Error marking notification as read:', err.message);
      res.status(500).json({ error: 'Failed to update notification' });
    }
  }
};

module.exports = notificationController;
