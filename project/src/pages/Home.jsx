import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Users, BookOpen, Calendar, Award, ArrowRight, Star, Quote, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import Mailchimp from '../components/Mailchimp';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        
        // Extract unique tags
        const tags = new Set();
        data.forEach(post => {
          if (post.tags) {
            post.tags.forEach(tag => tags.add(tag));
          }
        });
        setAllTags(Array.from(tags));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartReading = () => {
    // Scroll to the posts section
    const postsSection = document.querySelector('#posts-section');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

 

  const checkUserLoggedIn = () => {
    // Check if user is logged in by looking for auth token or user data
    // This could be from localStorage, sessionStorage, or a context/state management
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    // Return true if either token or user data exists
    return !!(token || user);
  };

  const handleCreateBlog = () => {
    const isLoggedIn = checkUserLoggedIn();
    
    if (isLoggedIn) {
      // User is logged in, redirect to create blog page
      window.location.href = '/create';
      // Or if using React Router: navigate('/create-blog');
    } else {
      // User is not logged in, redirect to login page
      window.location.href = '/login';
      // Or if using React Router: navigate('/login');
    }
  };


  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  const featuredPosts = posts.slice(0, 3);

  const categories = [
    { name: 'Technology', count: 45, color: 'bg-blue-500', icon: '💻' },
    { name: 'Design', count: 32, color: 'bg-purple-500', icon: '🎨' },
    { name: 'Business', count: 28, color: 'bg-green-500', icon: '💼' },
    { name: 'Lifestyle', count: 36, color: 'bg-orange-500', icon: '🌟' },
    { name: 'Science', count: 24, color: 'bg-indigo-500', icon: '🔬' },
    { name: 'Travel', count: 18, color: 'bg-pink-500', icon: '✈️' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      content: 'This platform has transformed how I share my ideas. The community is amazing and the tools are incredible.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Tech Blogger',
      content: 'The best blogging platform I\'ve ever used. Clean interface, great features, and fantastic community engagement.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Expert',
      content: 'BlogApp has helped me reach thousands of readers. The analytics and SEO features are top-notch.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-32 w-32 border-t-4 border-purple-600 animate-spin animation-delay-150 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with 3D Elements */}
      <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        
        {/* Floating 3D Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-float-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              BlogApp
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            Discover amazing stories, share your thoughts, and connect with a community of passionate writers and readers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <button 
              onClick={handleStartReading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              Start Reading
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={handleCreateBlog}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Create Your Blog
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Active Users', value: '10K+', color: 'text-blue-600' },
              { icon: BookOpen, label: 'Published Posts', value: '50K+', color: 'text-purple-600' },
              { icon: Calendar, label: 'Daily Reads', value: '100K+', color: 'text-green-600' },
              { icon: Award, label: 'Featured Writers', value: '500+', color: 'text-orange-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-700 rounded-full shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${category.color} p-6 rounded-2xl text-white text-center transform hover:scale-110 hover:rotate-3 transition-all duration-300 group-hover:shadow-2xl`}>
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-semibold mb-1">{category.name}</div>
                  <div className="text-sm opacity-90">{category.count} posts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <div key={post.id} className="group" style={{ animationDelay: `${index * 200}ms` }}>
                  <BlogCard post={post} featured={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div id="posts-section" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Discover All Posts
          </h2>
          
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search amazing stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-12 pr-8 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white min-w-[200px] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {searchTerm || selectedTag ? 'Try adjusting your search or filter criteria.' : 'Be the first to create a post!'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Community Says
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
              <Quote className="h-12 w-12 mx-auto mb-6 opacity-50" />
              <p className="text-xl md:text-2xl mb-8 font-light">
                {testimonials[currentTestimonial].content}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full border-4 border-white/20"
                />
                <div>
                  <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                  <div className="opacity-75">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Mail className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get the latest stories and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
           <Mailchimp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
