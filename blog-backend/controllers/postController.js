const Post = require('../models/Post');

const postController = {

 async createPost(req, res) {
    const { title, content, image_url, tags } = req.body;
    const userId = req.user.id; 

    try {
      const newPost = await Post.createPost(userId, title, content, image_url, tags);
      console.log('✅ Post created:', newPost);
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
      console.error('Create post error:', err.message);
      res.status(500).json({ error: 'Failed to create post' });
    }
  },

  
async getAllPosts(req, res) {
    try {
        const posts = await Post.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
},

async incrementViewCount(req, res)  {
  const postId = req.params.id;
  try {
    await Post.incrementViews(postId);
    res.status(200).json({ message: 'View count incremented' });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ error: 'Failed to increment view count' });
  }
},

async getPostById(req, res) {
    const postId = req.params.id;

    try {
      const post = await Post.getPostById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (err) {
      console.error('Fetch single post error:', err.message);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  },
  
  async getPostsByUser(req, res) {
    const { userId } = req.params;

    try {
      const posts = await Post.getPostsByUser(userId);

      if (!posts.length) {
        return res.status(404).json({ message: 'No posts found for this user.' });
      }

      res.json(posts);
    } catch (error) {
      console.error('Error in getPostsByUser:', error);
      res.status(500).json({ message: 'Server error fetching user posts.' });
    }
  },


async updatePost(req, res) {
    const postId = req.params.id;
    const { title, content, image_url, tags } = req.body;

    try {
      const updatedPost = await Post.updatePost(postId, title, content, image_url, tags);
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found or update failed' });
      }
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
      console.error('Update post error:', err.message);
      res.status(500).json({ error: 'Failed to update post' });
    }
  },

  
  async deletePost(req, res) {
  const postId = req.params.id;
  const userId = req.user.id;
  const isAdmin = req.user.is_admin;


  try {
    const post = await Post.getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }


    if (post.user_id !== userId && !isAdmin) {
      return res.status(403).json({ error: 'Access denied: Not your post or admin' });
    }

    await Post.deletePost(postId);
    res.status(200).json({ message: 'Post deleted successfully' });

  } catch (err) {
    console.error('Delete post error:', err.message);
    res.status(500).json({ error: 'Failed to delete post' });
  }
}
}
module.exports = postController;