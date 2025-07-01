import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  User, 
  Tag, 
  Star, 
  MessageCircle, 
  Edit, 
  Trash2,
  Send,
  ArrowLeft
} from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  if (!id) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
        ❌ Invalid Post ID
      </p>
    </div>
  );
}
const { user, token } = useAuth(); // ✅ Include token

  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);


  const incrementViews = async () => {

  try {
    await fetch(`http://localhost:5000/api/posts/${id}/view`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error incrementing post views:', error);
  }
};


  useEffect(() => {
  if (id) {
    fetchPost();
    fetchComments();
    if (user) fetchUserRating();
    // incrementViews();
  }
}, [id, user]);



const hasIncremented = useRef(false);

useEffect(() => {
  if (!hasIncremented.current) {
    incrementViews(); // Only call once
    hasIncremented.current = true;
  }
}, []);

  


  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRating = async () => {
    try {
       const response = await fetch(`http://localhost:5000/api/ratings/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
       if (response.ok) {
      const data = await response.json();
      setRating(data.averageRating || 0);
      setUserRating(data.userRating || 0);
    } else {
      console.error('Rating fetch failed:', response.status);
    }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };



  const handleRating = async (newRating) => {
    if (!user) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        
        body: JSON.stringify({
          postId: id,
          rating: newRating,
        }),
      });
      
      // console.log(response)
  
      if (response.ok) {
        setUserRating(newRating);
       
        fetchUserRating(); 
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
},

        body: JSON.stringify({
          postId: id,
          content: newComment
        }),
      });
    
       

      if (response.ok) {
        setNewComment('');
        fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: 'DELETE',
            headers: {
    'Authorization': `Bearer ${token}`,
  },
        });

        if (response.ok) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link 
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to posts</span>
      </Link>

      {/* Post header */}
      <div className="mb-8">
        {post.image_url && (
          <div className="aspect-video mb-6 rounded-xl overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{post.author_name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            {rating > 0 && (
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
             <span>
  {typeof rating === 'number' ? rating.toFixed(1) : 'No ratings'}
</span>

              </div>
            )}
          </div>

          {user && (user.id === post.user_id || user.is_admin) && (
            <div className="flex items-center space-x-2">
              <Link 
                to={`/edit/${post.id}`}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDeletePost}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
          {post.content}
        </div>
      </div>

      {/* Rating section */}
      {user && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rate this post</h3>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className={`h-8 w-8 ${
                  star <= userRating 
                    ? 'text-yellow-500' 
                    : 'text-gray-300 dark:text-gray-600'
                } hover:text-yellow-500 transition-colors`}
              >
                <Star className="h-full w-full fill-current" />
              </button>
            ))}
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {userRating > 0 ? `You rated: ${userRating}/5` : 'Click to rate'}
            </span>
          </div>
        </div>
      )}

      {/* Comments section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-6">
          <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h3>
        </div>

        {/* Add comment form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Post Comment</span>
            </button>
          </form>
        ) : (
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Login
            </Link> to post a comment.
          </p>
        )}

        {/* Comments list */}
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {comment.author_name ? comment.author_name[0].toUpperCase() : 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {comment.author_name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 ml-10">
                {comment.content}
              </p>
            </div>
          ))}
          
          {comments.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;