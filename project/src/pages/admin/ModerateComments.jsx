import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Search, Eye, Trash2, Calendar, User } from 'lucide-react';

const ModerateComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const token = localStorage.getItem("token");
    try {
      // In a real app, this would be a dedicated admin endpoint
     const response = await fetch('http://localhost:5000/api/comments', {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
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

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
          method: 'DELETE',
          headers :{
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        }});

        if (response.ok) {
          setComments(comments.filter(comment => comment.id !== commentId));
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const filteredComments = comments.filter(comment => 
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (comment.author_name && comment.author_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (comment.post_title && comment.post_title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <MessageCircle className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Moderate Comments
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Review and moderate user comments across all posts.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search comments by content, author, or post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Comments ({filteredComments.length})
          </h2>
        </div>

        {filteredComments.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
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
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {comment.content}
                      </p>
                      {comment.post_title && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          On post: <span className="font-medium">{comment.post_title}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {comment.post_id && (
                      <Link
                        to={`/blog/${comment.post_id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="View Post"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete Comment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No comments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No comments have been posted yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModerateComments;