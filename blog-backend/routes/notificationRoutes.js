const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middleware/authMiddleware');


router.get('/', verifyToken, notificationController.getNotifications);


router.put('/:notificationId', verifyToken, notificationController.markAsRead);

module.exports = router;
