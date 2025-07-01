import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Star } from 'lucide-react';
import { motion } from 'framer-motion';


const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {post.image_url && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4 text-blue-400"  />
            <span>{post.author_name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          {post.average_rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{post.average_rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.content.substring(0, 150)}...
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
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
      </div>
    </div>
  );
};

export default BlogCard;