import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 md:mb-0">
            <BookOpen className="h-8 w-8" />
            <span>BlogApp</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by BlogApp Team</span>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;