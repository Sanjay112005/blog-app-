const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const verifyAdmin = require('../middleware/verifyadmin');

router.get('/:id', verifyToken, userController.getUserById);


router.put('/:id', verifyToken, userController.updateUser);

// 🧾 Admin: Get all users
router.get('/', verifyToken, userController.getAllUsers);

// ❌ Admin: Delete user
router.delete('/:id', verifyToken, userController.deleteUser);

// router.put("/users/:id", verifyToken, verifyAdmin, userController.toggleAdmin);

// PATCH /api/users/toggle-admin
router.patch('/toggle-admin', verifyToken, userController.toggleAdminByEmail);

// router.put('/api/users/:id/admin', verifyToken, userController.toggleAdmin);


router.delete('/admin/posts/:id', verifyToken, userController.deletePostAsAdmin);

module.exports = router;
