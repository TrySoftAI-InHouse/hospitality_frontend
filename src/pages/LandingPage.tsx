import { useState } from 'react';
import {
  Hotel, Wifi, Utensils, Dumbbell, MapPin, Phone, Building2,
  ChevronDown, Heart, Moon, User, Calendar, Users, Star,
  BellRing, ClipboardCheck, Coffee, Bed, Shield, Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function LandingPage() {

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const featuredProperties = [
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
      name: "Luxury Suite",
      rating: 4.8,
      reviews: 1205,
      price: "$350",
      amenities: ["Free WiFi", "Spa Access", "Room Service"],
    },
    {
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3",
      name: "Executive Room",
      rating: 4.6,
      reviews: 892,
      price: "$250",
      amenities: ["Business Center", "Breakfast", "Gym Access"],
    },
    {
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3",
      name: "Family Suite",
      rating: 4.7,
      reviews: 756,
      price: "$400",
      amenities: ["Kid's Area", "Multiple Beds", "Entertainment"],
    },
    {
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3",
      name: "Standard Room",
      rating: 4.5,
      reviews: 987,
      price: "$180",
      amenities: ["Free WiFi", "Breakfast", "City View"],
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
    "How does the hospitality management system improve guest experience?",
    "What training is provided for hotel staff?",
    "Can the system be customized for our specific hotel needs?",
    "How secure is guest data in your system?",
    "What support options are available after implementation?",
  ];


  const handleSearch = () => {
    setIsSearching(true);
    // Here you would typically call an API to search for available rooms
    console.log({
      checkInDate,
      checkOutDate,
      guestCount
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      // Handle search results in your application
    }, 1500);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Header */}
      <header className="bg-[#1e3a8a] text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">HMS Portal</div>
          <div className="flex space-x-4 items-center">
            <button className="text-sm hover:underline">Help</button>
            <Moon className="w-4 h-4" />
            <Link to="/login" className="flex items-center text-sm space-x-1 hover:underline">
      <User className="w-4 h-4" />
      <span>Log in</span>
    </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">Modern Hospitality Management System</h1>
            <p className="text-xl text-white mb-8">Streamline your hotel operations with our comprehensive management solution</p>
            <div className="flex space-x-4">
              <Button className="px-8 py-3 text-lg">Get Started</Button>
              <Button variant="outline" className="px-8 py-3 text-lg">Learn More</Button>
            </div>
          </div>
        </div>
      </section>


      <section className="container mx-auto px-4 -mt-20 z-10 relative">
      <div className="bg-white rounded-lg p-6 shadow-2xl max-w-5xl mx-auto border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Stay</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          
          {/* Guests */}
          <div className="relative">
            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
              <option value="9">9+ Guests</option>
            </select>
          </div>
          
          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!checkInDate || !checkOutDate || isSearching}
            className={`h-12 rounded-md font-medium text-white transition-all ${
              (!checkInDate || !checkOutDate) 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isSearching 
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
              'Check Availability'
            )}
          </button>
        </div>
        
        {/* Additional Filters (optional) */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
            Free Cancellation
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
            Breakfast Included
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
            Swimming Pool
          </button>
        </div>
      </div>
    </section>
      {/* Booking Search */}
      {/* <section className="container mx-auto px-4 -mt-20 z-10 relative">
        <div className="bg-white rounded-lg p-6 shadow-xl max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input placeholder="Check-in Date" className="pl-10 h-12" />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input placeholder="Check-out Date" className="pl-10 h-12" />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input placeholder="Guests" className="pl-10 h-12" />
            </div>
            <Button className="h-12">Check Availability</Button>
          </div>
        </div>
      </section> */}

      {/* Services */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Premium Hotel Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotelServices.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="text-[#1e3a8a] mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Accommodations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.map((room, idx) => (
              <Card key={idx} className="bg-white hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={room.image} className="w-full h-56 object-cover" />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </div>
                </div>
                <CardContent>
                  <h3 className="font-bold text-lg">{room.name}</h3>
                  <div className="flex items-center gap-2 my-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{room.rating}</span>
                    <span className="text-xs text-gray-500">({room.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-800 mb-4">
                    {room.amenities.map((a, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#1e3a8a]">{room.price}<span className="text-sm font-normal text-gray-500"> /night</span></span>
                    <Button variant="outline" className="text-[#1e3a8a] border-[#1e3a8a]">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Management Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Management Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {managementFeatures.map((f, idx) => (
            <div key={idx} className="bg-white border p-6 rounded-lg hover:shadow-lg transition-all">
              <div className="bg-indigo-50 w-14 h-14 flex items-center justify-center rounded-lg mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
 <section className="bg-white py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-[#1e3a8a]">500+</h3>
            <p className="text-gray-600 mt-2">Hotels Onboarded</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#1e3a8a]">12,000+</h3>
            <p className="text-gray-600 mt-2">Rooms Managed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#1e3a8a]">4.9/5</h3>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>
        </div>
      </section>
      {/* Integrations */}
      <section className="bg-gray-50 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Connect With Tools You Love</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          We support Stripe, Twilio, Slack, Booking.com, and many more via Zapier integrations.
        </p>
        <div className="flex justify-center flex-wrap gap-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-10" />
          <img src="https://cdn.freebiesupply.com/logos/large/2x/zapier-logo-png-transparent.png" alt="Zapier" className="h-10" />
          <img src="https://logos-world.net/wp-content/uploads/2020/11/Twilio-Logo.png" alt="Twilio" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Slack" className="h-10" />
        </div>
      </section>

      {/* Mobile App */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg"
              alt="Mobile App"
              className="w-full max-w-sm mx-auto rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-4">Manage on the Go</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our iOS and Android apps help staff and guests stay connected and in control 24/7.
            </p>
            <div className="flex gap-4">
              <img
                src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"
                alt="App Store"
                className="h-12"
              />
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Google Play"
                className="h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">From Our Blog</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Automating Check-ins with APIs",
                date: "July 2025",
                image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                title: "Guest Personalization Best Practices",
                date: "June 2025",
                image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                title: "Improving ROI via Analytics",
                date: "May 2025",
                image: "https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
            ].map((post, idx) => (
              <div key={idx} className="text-left">
                <img src={post.image} alt="" className="rounded-lg mb-4 w-full h-48 object-cover" />
                <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                <p className="text-gray-500 text-sm">{post.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Mendes",
                role: "Manager, Iberia Hotels",
                quote: "We cut check-in time by 50%. The dashboard is a game changer.",
              },
              {
                name: "Amira Noor",
                role: "Front Desk Lead, Nile Resorts",
                quote: "Mobile app improved guest satisfaction dramatically.",
              },
              {
                name: "Jake Wells",
                role: "Owner, Boutique Inn NYC",
                quote: "It's like having a full IT team managing my hotel.",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border p-6 rounded-lg text-left shadow-sm">
                <p className="italic text-gray-600 mb-4">"{t.quote}"</p>
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQs */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((question, idx) => (
            <div key={idx} className="border p-4 rounded-md flex justify-between items-center hover:shadow-md">
              <span className="font-medium text-lg">{question}</span>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hotel Management?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">Join hundreds of hotels worldwide that have enhanced their operations and guest satisfaction</p>
        <div className="flex justify-center gap-4">
          <Button className="px-8 py-3 text-lg">Request Demo</Button>
          <Button variant="outline" className="px-8 py-3 text-lg">Contact Sales</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">© HMS Portal {new Date().getFullYear()} - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}




