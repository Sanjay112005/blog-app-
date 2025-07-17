import React from 'react';
import {
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  Github,
  Heart
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Logo and About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-2xl font-extrabold text-white">
              <BookOpen className="h-8 w-8 text-orange-500" />
              <span>BlogApp</span>
            </div>
            <p className="text-gray-400 text-sm">
              BlogApp is your go-to platform for sharing stories, learning from others, and exploring ideas. Built for creators, thinkers, and readers.
            </p>
          </div>

          {/* Links: Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Write a Blog</a></li>
              <li><a href="#" className="hover:text-white">Explore</a></li>
              <li><a href="#" className="hover:text-white">Integrations</a></li>
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 1800-000-1234</li>
              <li>📧 support@blogapp.com</li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li>Need help? <a href="#" className="underline hover:text-white">Chat with us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1">
            <span>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by BlogApp Team</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-blue-400"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-pink-500"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-gray-300"><Github className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
