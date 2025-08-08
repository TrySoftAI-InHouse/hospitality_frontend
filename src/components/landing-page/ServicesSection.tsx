import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Utensils, 
  Dumbbell, 
  ConciergeBell, 
  Car, 
  Spa, 
  Luggage, 
  Snowflake 
} from 'lucide-react';

const ServicesSection = () => {
  const hotelServices = [
    {
      icon: <Wifi className="w-10 h-10" />,
      title: "High-Speed WiFi",
      description: "Stay connected with our ultra-fast fiber optic internet throughout the property"
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: "Gourmet Dining",
      description: "Experience world-class cuisine at our award-winning restaurants"
    },
    {
      icon: <Dumbbell className="w-10 h-10" />,
      title: "Fitness Center",
      description: "State-of-the-art gym equipment available 24/7 for your convenience"
    },
    {
      icon: <ConciergeBell className="w-10 h-10" />,
      title: "24/7 Concierge",
      description: "Our dedicated staff is always available to assist with your needs"
    },
    {
      icon: <Car className="w-10 h-10" />,
      title: "Valet Parking",
      description: "Complimentary valet service for all hotel guests"
    },
    {
      icon: <Spa className="w-10 h-10" />,
      title: "Luxury Spa",
      description: "Rejuvenate with our signature treatments and therapies"
    },
    {
      icon: <Luggage className="w-10 h-10" />,
      title: "Luggage Storage",
      description: "Secure storage available before check-in and after check-out"
    },
    {
      icon: <Snowflake className="w-10 h-10" />,
      title: "Climate Control",
      description: "Individually controlled air conditioning in all rooms"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
   
   <section id="services" className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Premium <span className="text-blue-600">Hotel Services</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We provide exceptional services to ensure your stay is comfortable and memorable
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {hotelServices.map((service, idx) => (
          <motion.div 
            key={idx} 
            variants={item}
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            className="bg-white rounded-xl p-8 shadow-lg text-center border border-gray-100 hover:border-blue-100 transition-all"
          >
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
          Explore All Services
        </button>
      </motion.div>
    </section>
  );
};

export default ServicesSection;