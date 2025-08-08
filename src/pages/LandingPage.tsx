import { useState, useEffect,useRef  } from 'react';
import {
  Hotel, Wifi, Utensils, Dumbbell, MapPin, Phone, Building2,
  ChevronDown, Heart, Moon, User, Calendar, Users, Star,
  BellRing, ClipboardCheck, Coffee, Bed, Shield, Clock,
  ChevronRight, Check, X, Menu, Search, ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
   const videoRef = useRef(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    amenities: [],
    rating: 0
  });

  // Mock data
  const featuredProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
      name: "Luxury Suite",
      rating: 4.8,
      reviews: 1205,
      price: 350,
      amenities: ["Free WiFi", "Spa Access", "Room Service", "Pool"],
      location: " Mayland Baltimore",
      available: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3",
      name: "Executive Room",
      rating: 4.6,
      reviews: 892,
      price: 250,
      amenities: ["Business Center", "Breakfast", "Gym Access"],
      location: "Mayland Baltimore",
      available: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3",
      name: "Family Suite",
      rating: 4.7,
      reviews: 756,
      price: 400,
      amenities: ["Kid's Area", "Multiple Beds", "Entertainment", "Breakfast"],
      location: "Mayland Baltimore",
      available: true
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3",
      name: "Standard Room",
      rating: 4.5,
      reviews: 987,
      price: 180,
      amenities: ["Free WiFi", "Breakfast", "City View"],
      location: "Mayland Baltimore",
      available: true
    },
  ];

  const hotelServices = [
    {
      icon: <Utensils className="w-10 h-10" />,
      title: "Fine Dining",
      description: "Experience culinary excellence with our award-winning chefs",
    },
    {
      icon: <Dumbbell className="w-10 h-10" />,
      title: "Fitness Center",
      description: "State-of-the-art equipment and professional trainers",
    },
    {
      icon: <Wifi className="w-10 h-10" />,
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary high-speed internet",
    },
    {
      icon: <BellRing className="w-10 h-10" />,
      title: "24/7 Service",
      description: "Round-the-clock concierge and room service",
    },
  ];

  const managementFeatures = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-indigo-600" />,
      title: "Reservation Management",
      description: "Streamline booking processes and manage room availability efficiently",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Guest Profiles",
      description: "Maintain detailed guest information and preferences for personalized service",
    },
    {
      icon: <Coffee className="w-8 h-8 text-indigo-600" />,
      title: "Service Requests",
      description: "Handle guest requests and track service delivery in real-time",
    },
    {
      icon: <Clock className="w-8 h-8 text-indigo-600" />,
      title: "Housekeeping",
      description: "Schedule and monitor room cleaning and maintenance activities",
    },
  ];

  const faqs = [
    {
      question: "How does the hospitality management system improve guest experience?",
      answer: "Our system provides real-time updates, personalized services, and seamless communication between staff and guests, resulting in higher satisfaction scores."
    },
    {
      question: "What training is provided for hotel staff?",
      answer: "We offer comprehensive onboarding, video tutorials, and 24/7 support to ensure your team can use all features effectively."
    },
    {
      question: "Can the system be customized for our specific hotel needs?",
      answer: "Yes, our platform is highly customizable with modular components that can be tailored to your property's unique requirements."
    },
    {
      question: "How secure is guest data in your system?",
      answer: "We use bank-grade encryption, regular security audits, and comply with all major data protection regulations to keep guest information safe."
    },
    {
      question: "What support options are available after implementation?",
      answer: "We provide email, phone, and chat support with guaranteed response times, plus an extensive knowledge base and community forum."
    },
  ];

  const amenitiesOptions = [
    "Free WiFi", "Breakfast", "Pool", "Gym", "Spa", "Parking", "Pet Friendly", "Airport Shuttle"
  ];

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with filters
    setTimeout(() => {
      let results = [...featuredProperties];
      
      // Apply location filter
      if (location) {
        results = results.filter(property => 
          property.location.toLowerCase().includes(location.toLowerCase()) ||
          property.name.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Apply price filter
      results = results.filter(property => 
        property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1]
      );
      
      // Apply rating filter
      if (filters.rating > 0) {
        results = results.filter(property => property.rating >= filters.rating);
      }
      
      // Apply amenities filter
      if (filters.amenities.length > 0) {
        results = results.filter(property => 
          filters.amenities.every(amenity => 
            property.amenities.includes(amenity)
          )
        );
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity]
        };
      }
    });
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Scroll to results after search
  useEffect(() => {
    if (searchResults.length > 0) {
      document.getElementById('search-results').scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchResults]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="bg-[#1e3a8a] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center">
            <Hotel className="mr-2" />
            HMS Portal
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#rooms" className="hover:underline">Rooms</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#testimonials" className="hover:underline">Testimonials</a>
            <button className="text-sm hover:underline flex items-center">
              <Moon className="w-4 h-4 mr-1" />
              Dark Mode
            </button>
            <Link to="/login" className="flex items-center text-sm space-x-1 hover:underline">
              <User className="w-4 h-4" />
              <span>Log in</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#1a337a] px-4 py-3 space-y-3">
            <a href="#features" className="block hover:underline">Features</a>
            <a href="#rooms" className="block hover:underline">Rooms</a>
            <a href="#services" className="block hover:underline">Services</a>
            <a href="#testimonials" className="block hover:underline">Testimonials</a>
            <div className="flex items-center justify-between pt-2 border-t border-[#2d4a9a]">
              <button className="text-sm hover:underline flex items-center">
                <Moon className="w-4 h-4 mr-1" />
                Dark Mode
              </button>
              <Link to="/login" className="flex items-center text-sm space-x-1 hover:underline">
                <User className="w-4 h-4" />
                <span>Log in</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://media.ffycdn.net/eu/mandarin-oriental-hotel-group/N7cLD3V74jhfYizY3EdR.mp4?format=mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80" 
            alt="Hotel background" 
            className="w-full h-full object-cover"
          />
        </video>
      </div>
      
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
      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-20 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-2xl max-w-5xl mx-auto border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Stay</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
            <input
              type="text"
              placeholder="Location" 
              className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          {/* Check-in Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={today}
              placeholderText="Check-in Date"
              className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          
          {/* Check-out Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate || tomorrow}
              placeholderText="Check-out Date"
              className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={isSearching}
            className={`h-12 rounded-md font-medium text-white transition-all ${
              isSearching 
                ? 'bg-blue-600 cursor-wait' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSearching ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Search className="w-4 h-4 mr-2" />
                Search
              </span>
            )}
          </motion.button>
        </div>
        
        {/* Filters Section */}
        <div className="mt-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="text-blue-600 flex items-center text-sm font-medium"
          >
            {showFilters ? 'Hide filters' : 'Show filters'} 
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <h4 className="font-medium mb-2">Price Range</h4>
                      <div className="flex items-center space-x-4">
                        <input
                          type="number" 
                          placeholder="Min" 
                          value={filters.priceRange[0]}
                          onChange={(e) => setFilters({
                            ...filters,
                            priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                          })}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number" 
                          placeholder="Max" 
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters({
                            ...filters,
                            priceRange: [filters.priceRange[0], parseInt(e.target.value) || 1000]
                          })}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500 mr-2">${filters.priceRange[0]}</span>
                        <input 
                          type="range" 
                          min="0" 
                          max="1000" 
                          step="50"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters({
                            ...filters,
                            priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                          })}
                          className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 ml-2">${filters.priceRange[1]}</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div>
                      <h4 className="font-medium mb-2">Minimum Rating</h4>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFilters({
                              ...filters,
                              rating: filters.rating === star ? 0 : star
                            })}
                            className={`p-1 rounded transition-colors ${filters.rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                          >
                            <Star className="w-5 h-5 fill-current" />
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {filters.rating > 0 ? `${filters.rating}+ stars` : 'Any rating'}
                      </p>
                    </div>
                    
                    {/* Amenities */}
                    <div>
                      <h4 className="font-medium mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {amenitiesOptions.map((amenity) => (
                          <motion.button
                            key={amenity}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleAmenity(amenity)}
                            className={`px-3 py-1 text-sm rounded-full flex items-center transition-colors ${
                              filters.amenities.includes(amenity)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                          >
                            {amenity}
                            {filters.amenities.includes(amenity) && (
                              <Check className="w-3 h-3 ml-1" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Selected Filters */}
                  {filters.rating > 0 || filters.amenities.length > 0 ? (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-2">Selected Filters</h4>
                      <div className="flex flex-wrap gap-2">
                        {filters.rating > 0 && (
                          <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {filters.rating}+ Stars
                            <button 
                              onClick={() => setFilters({...filters, rating: 0})}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        {filters.amenities.map(amenity => (
                          <div key={amenity} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {amenity}
                            <button 
                              onClick={() => toggleAmenity(amenity)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section id="search-results" className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {searchResults.length} properties found
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border rounded-md px-3 py-1 text-sm">
                <option>Recommended</option>
                <option>Price (low to high)</option>
                <option>Price (high to low)</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((room) => (
              <Card key={room.id} className="hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="relative h-48">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button className="bg-white/90 p-2 rounded-full hover:bg-white transition">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  {!room.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium bg-red-500 px-3 py-1 rounded-full text-sm">
                        Booked
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="flex-grow p-4 flex flex-col">
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {room.location}
                    </p>
                    <div className="flex items-center mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium ml-1">{room.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({room.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-800 mb-4">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">{amenity}</span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="bg-gray-100 px-2 py-1 rounded-full">+{room.amenities.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t">
                    <div>
                      <span className="text-xl font-bold text-[#1e3a8a]">${room.price}</span>
                      <span className="text-sm text-gray-500"> /night</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-[#1e3a8a]/10"
                      disabled={!room.available}
                    >
                      {room.available ? 'Book Now' : 'Unavailable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section id="services" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Premium Hotel Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide exceptional services to ensure your stay is comfortable and memorable
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotelServices.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center hover:shadow-xl transition-shadow hover:-translate-y-1">
              <div className="text-[#1e3a8a] mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Rooms */}
      <section id="rooms" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Accommodations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular rooms and suites
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.map((room) => (
              <Card key={room.id} className="bg-white hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-red-50 transition">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {room.location}
                  </p>
                  <div className="flex items-center gap-2 my-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{room.rating}</span>
                    <span className="text-xs text-gray-500">({room.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-800 mb-4">
                    {room.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">{a}</span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="bg-gray-100 px-2 py-1 rounded-full">+{room.amenities.length - 3}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <span className="text-xl font-bold text-[#1e3a8a]">${room.price}</span>
                      <span className="text-sm font-normal text-gray-500"> /night</span>
                    </div>
                    <Button variant="outline" className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-[#1e3a8a]/10">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="px-8 py-3">
              View All Rooms <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Management Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Management Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Powerful tools designed to streamline hotel operations and enhance guest experiences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {managementFeatures.map((f, idx) => (
            <div key={idx} className="bg-white border p-6 rounded-lg hover:shadow-lg transition-all hover:border-indigo-100 group">
              <div className="bg-indigo-50 w-14 h-14 flex items-center justify-center rounded-lg mb-4 group-hover:bg-indigo-100 transition">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-4xl font-bold text-[#1e3a8a]">500+</h3>
            <p className="text-gray-600 mt-2">Hotels Onboarded</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-4xl font-bold text-[#1e3a8a]">12,000+</h3>
            <p className="text-gray-600 mt-2">Rooms Managed</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-4xl font-bold text-[#1e3a8a]">4.9/5</h3>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-gray-50 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Connect With Tools You Love</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We support Stripe, Twilio, Slack, Booking.com, and many more via Zapier integrations.
          </p>
          <div className="flex justify-center flex-wrap gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-10 opacity-70 hover:opacity-100 transition" />
            <img src="https://cdn.freebiesupply.com/logos/large/2x/zapier-logo-png-transparent.png" alt="Zapier" className="h-10 opacity-70 hover:opacity-100 transition" />
            <img src="https://logos-world.net/wp-content/uploads/2020/11/Twilio-Logo.png" alt="Twilio" className="h-10 opacity-70 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Slack" className="h-10 opacity-70 hover:opacity-100 transition" />
          </div>
        </div>
      </section>

      {/* Mobile App */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg"
              alt="Mobile App"
              className="w-full max-w-sm mx-auto rounded-xl shadow-xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-4">Manage on the Go</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our iOS and Android apps help staff and guests stay connected and in control 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"
                alt="App Store"
                className="h-12 w-auto"
              />
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Google Play"
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">From Our Blog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Latest insights and trends in hospitality management
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Automating Check-ins with APIs",
                date: "July 2025",
                excerpt: "How modern APIs are transforming the guest arrival experience",
                image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                title: "Guest Personalization Best Practices",
                date: "June 2025",
                excerpt: "Creating memorable experiences through data-driven personalization",
                image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                title: "Improving ROI via Analytics",
                date: "May 2025",
                excerpt: "Leveraging data to optimize operations and increase profitability",
                image: "https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
            ].map((post, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                  <img 
                    src={post.image} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-medium">Read article</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <p className="text-gray-500 text-sm">{post.date}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="px-8 py-3">
              View All Articles <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from hotels that have transformed their operations with our system
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Mendes",
                role: "Manager, Iberia Hotels",
                quote: "We cut check-in time by 50%. The dashboard is a game changer.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Amira Noor",
                role: "Front Desk Lead, Nile Resorts",
                quote: "Mobile app improved guest satisfaction dramatically.",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Jake Wells",
                role: "Owner, Boutique Inn NYC",
                quote: "It's like having a full IT team managing my hotel.",
                image: "https://randomuser.me/api/portraits/men/75.jpg"
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border p-6 rounded-lg hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-600">"{t.quote}"</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our hospitality management system
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border p-4 rounded-md hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => toggleFAQ(idx)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${activeFAQ === idx ? 'rotate-180' : ''}`} />
              </div>
              {activeFAQ === idx && (
                <div className="mt-3 pt-3 border-t text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e3a8a] text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hotel Management?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of hotels worldwide that have enhanced their operations and guest satisfaction
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="px-8 py-3 text-lg bg-white text-[#1e3a8a] hover:bg-gray-100">
              Request Demo
            </Button>
            <Button variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Hotel className="mr-2" />
                HMS Portal
              </h3>
              <p className="text-gray-400">
                Modern solutions for modern hospitality businesses.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © HMS Portal {new Date().getFullYear()} - All rights reserved
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}