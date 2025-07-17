import React from 'react';
import { Mail } from 'lucide-react';

const Mailchimp = () => {
  return (
    <form
      action="https://gmail.us6.list-manage.com/subscribe/post?u=ab7e17a5879d03a14fccc10f6&amp;id=106afe250b&amp;f_id=008134e1f0"
      method="post"
      target="_blank"
      noValidate
      className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl px-6 py-8 w-full max-w-lg mx-auto space-y-6"
    >
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Subscribe to Blog Updates
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          No spam. Just pure blogging inspiration ✨
        </p>
      </div>

      {/* Email Input */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          required
          placeholder="Enter your email"
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Bot hidden field */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input
          type="text"
          name="b_ab7e17a5879d03a14fccc10f6_106afe250b"
          tabIndex="-1"
          defaultValue=""
        />
      </div>

      {/* Subscribe Button */}
      <button
        type="submit"
        name="subscribe"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
      >
        Subscribe
      </button>
    </form>
  );
};

export default Mailchimp;
