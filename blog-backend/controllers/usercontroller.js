const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

const userController = {
  // 🔍 Get user by ID (self or any public profile)
  async getUserById(req, res) {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Exclude password from response
      const { password, ...safeUser } = user;
      res.status(200).json(safeUser);
    } catch (err) {
      console.error('Get user error:', err.message);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },
  
     async updateUser(req, res) {
  const userId = parseInt(req.params.id);
  const requesterId = req.user.id;

  if (userId !== requesterId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { name, email, currentPassword, newPassword } = req.body;

  try {
    // Always update name/email
    const updatedUser = await User.updateUser(userId, { name, email });

    // If password change is requested
    if (currentPassword && newPassword) {
      const user = await User.getUserById(userId);

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      await User.updateUserPassword(userId, hashed);
    }

    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    console.error('Update user error:', err.message);
    res.status(500).json({ error: 'Failed to update user' });
  }
},  

 async toggleAdmin(req, res) {
  // console.log("Decoded user from token:", req.user); 
  // console.log("🔧 toggleAdmin CALLED by:", req.user);
  console.log("Incoming update data:", req.body);

  const userId = req.params.id;
  const { is_admin } = req.body;


  // Only allow if requester is admin
  if (!req.user || !req.user.is_admin) {
     return res.status(403).json({ error: "Access denied" });
  }

  try {
    const updatedUser = await User.toggleAdminStatus(userId, is_admin);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating admin status:", error);
    res.status(500).json({ error: "Failed to update admin status" });
  }
},

async toggleAdminByEmail(req, res) {
  const { email, is_admin } = req.body;

  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updatedUser = await User.toggleAdminStatus(user.id, is_admin);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error toggling admin:', err.message);
    res.status(500).json({ error: 'Failed to toggle admin status' });
  }
}
,

  // 🧾 Admin: Get all users
  async getAllUsers(req, res) {
    if (!req.user.is_admin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error('Get all users error:', err.message);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  // ❌ Admin: Delete a user
  async deleteUser(req, res) {
    const userId = req.params.id;

    if (!req.user.is_admin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    try {
      const deleted = await User.deleteById(userId);
      if (!deleted) return res.status(404).json({ error: 'User not found' });

      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      console.error('Delete user error:', err.message);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

async deletePostAsAdmin(req, res) {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: 'Admin access only' });
  }

  const postId = req.params.id;

  try {
    const deleted = await Post.deletePost(postId); // reuse existing delete logic
    if (!deleted) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json({ message: 'Post deleted by admin' });
  } catch (err) {
    console.error('Admin delete post error:', err.message);
    res.status(500).json({ error: 'Failed to delete post' });
  }
}
}
module.exports = userController;
