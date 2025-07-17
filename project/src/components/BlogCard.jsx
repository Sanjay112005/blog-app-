import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Star, Eye, Heart, MessageCircle } from 'lucide-react';

const BlogCard = ({ post, featured = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cardClass = featured 
    ? "group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02] hover:-rotate-1"
    : "group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105";

  return (
    <article className={cardClass}>
      {/* Image Section */}
      {post.image_url && (
        <div className="relative overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Tags overlay */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Rating badge */}
          {post.average_rating && (
            <div className="absolute top-4 right-4 flex items-center space-x-1 bg-yellow-500/90 text-white px-2 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              <Star className="h-3 w-3 fill-current" />
              <span>{post.average_rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4 text-blue-500" />
            <span>{post.author_name || 'Anonymous'}</span>
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>

        <h3 className={`font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.content.substring(0, 150)}...
        </p>

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {post.views && (
              <div className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                <Eye className="h-4 w-4" />
                <span>{post.views}</span>
              </div>
            )}
            {post.likes && (
              <div className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </div>
            )}
            {post.comments && (
              <div className="flex items-center gap-1 hover:text-green-500 transition-colors duration-200">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </div>
            )}
            {post.average_rating && !post.image_url && (
              <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors duration-200">
                <Star className="h-4 w-4" />
                <span>{post.average_rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          <Link
            to={`/blog/${post.id}`}
            className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300 hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;