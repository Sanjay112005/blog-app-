const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Notification = require('../models/Notification');

const commentController = {
  
  async createComment(req, res) {
  const { postId, content } = req.body;
  const userId = req.user.id;            

  if (!postId || !content) {
    return res
      .status(400)
      .json({ error: 'Post ID and content are required' });
  }

  try {
    const newComment = await Comment.createComment(postId, userId, content);

    const post = await Post.getPostById(postId);          
    const receiverId = post.user_id; // renamed from recipientId to match DB schema

    if (receiverId !== userId) {
      await Notification.create({
        senderId: userId,
        receiverId, // ✅ updated field
        postId,
        type: 'comment',
        message: `${req.user.name} commented on your post`
      });
    }
    
    res.status(201).json({
      message: 'Comment added and notification sent',
      comment: newComment
    });
  } catch (err) {
    console.error('Create comment error:', err.message);
    res.status(500).json({ error: 'Failed to create comment' });
  }
},
  
  async getCommentsByPostId(req, res) {
    const postId = req.params.postId;

    try {
      const comments = await Comment.getCommentsByPostId(postId);
      res.status(200).json(comments);
    } catch (err) {
      console.error('Fetch comments error:', err.message);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  },

  // ❌ Delete a comment
  async deleteComment(req, res) {
    const commentId = req.params.commentId;

    try {
      const deletedComment = await Comment.deleteComment(commentId);
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      console.error('Delete comment error:', err.message);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  },

    async getAllComments(req, res) {
    try {
      const comments = await Comment.getAllComments();
      res.status(200).json(comments);
    } catch (err) {
      console.error('Error fetching comments:', err.message);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  },
  
};

module.exports = commentController;
