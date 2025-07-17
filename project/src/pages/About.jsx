import React from 'react';

const About = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">About BlogApp</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A platform built for storytellers, thinkers, and readers. BlogApp is more than just a blog — it's a space to inspire, connect, and grow.
          </p>
        </div>

        {/* Section 1: Our Vision */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">🌍 Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            At BlogApp, we believe that every voice matters. In a world full of noise, we aim to create a meaningful space where ideas, experiences, and knowledge can thrive.
            Whether you're a professional writer, a curious learner, or someone who simply loves to express, BlogApp welcomes you with open arms. Our vision is to foster a global community of individuals who inspire and uplift one another through words.
          </p>
        </div>

        {/* Section 2: Why We Exist */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">💡 Why BlogApp Exists</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Too many platforms today prioritize algorithms and ads over authentic content. We created BlogApp to change that.  
            This is a distraction-free environment built for real engagement, where your thoughts aren’t lost in a feed, and where readers truly connect with your message.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Our goal is to democratize content creation. You don’t need to be famous or tech-savvy to share your story. You just need a voice — and BlogApp gives it the platform it deserves.
          </p>
        </div>

        {/* Section 3: What You Can Do */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">🚀 What You Can Do on BlogApp</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-lg space-y-2">
            <li><strong>Write & Publish:</strong> Easily draft and share your ideas with the world using our intuitive editor.</li>
            <li><strong>Discover & Learn:</strong> Read content from a diverse range of creators on topics that matter to you.</li>
            <li><strong>Engage & Connect:</strong> Leave comments, start conversations, and be part of a growing knowledge-sharing community.</li>
            <li><strong>Save & Share:</strong> Bookmark your favorite posts or share them with friends and followers in one click.</li>
          </ul>
        </div>

        {/* Section 4: Our Promise */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">🤝 Our Promise to You</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            BlogApp is built with creators and readers in mind — always.  
            We are committed to keeping this platform:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-lg space-y-2">
            <li><strong>Open:</strong> Anyone can publish. No gatekeeping.</li>
            <li><strong>Respectful:</strong> A safe, moderated space for respectful conversation and honest expression.</li>
            <li><strong>Ad-Free:</strong> No annoying distractions or paywalls. Your words come first.</li>
            <li><strong>Continually Evolving:</strong> We listen to our users and continuously improve based on feedback.</li>
          </ul>
        </div>

        {/* Section 5: Final Thought */}
        <div className="text-center pt-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Ready to share your story?</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Join BlogApp today and become part of a creative movement that values authenticity, curiosity, and connection.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
