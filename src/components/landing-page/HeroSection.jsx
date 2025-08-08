import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80')` }}>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-600/20 blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full bg-amber-500/20 blur-[100px]" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Animated Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Modern Hospitality<br />
            <span className="text-amber-400">Management System</span>
          </motion.h1>
          
          {/* Animated Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed"
          >
            Streamline your hotel operations with our comprehensive, intuitive management solution designed for the modern hospitality industry.
          </motion.p>
          
          {/* Animated Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button className="px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg hover:shadow-xl">
              Get Started
              <ArrowRight className="ml-3 inline w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-transparent border-2 border-white text-white hover:bg-white/10">
              Learn More
              <ArrowRight className="ml-3 inline w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support" },
              { value: "5,000+", label: "Hotels Served" },
              { value: "40%", label: "Time Saved" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg flex flex-col items-center"
              >
                <span className="text-3xl font-bold text-indigo-600">{stat.value}</span>
                <span className="text-gray-600 mt-2">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scrolling Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-14 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-2 h-2 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;