import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, Award, Clock, Heart } from 'lucide-react';
import DeliveryAggregators from '../components/DeliveryAggregators';
import { getBusinessStatus } from '../utils/businessStatus';
import { useState, useEffect } from 'react';

const Home = () => {
  const [businessStatus, setBusinessStatus] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    setBusinessStatus(getBusinessStatus());
  }, []);

  const features = [
    {
      icon: <Truck size={40} />,
      title: 'Mobile & Convenient',
      description: 'Find us at various locations across Florida. Check our schedule!'
    },
    {
      icon: <Award size={40} />,
      title: 'Authentic Recipes',
      description: 'Traditional Veracruz recipes passed down through generations'
    },
    {
      icon: <Clock size={40} />,
      title: 'Fresh Daily',
      description: 'All ingredients sourced fresh daily for the best quality'
    },
    {
      icon: <Heart size={40} />,
      title: 'Made with Love',
      description: 'Every dish is prepared with passion and care'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599974594314-7fdc456e1d18?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Authentic Taste of{' '}
              <span className="text-accent">Veracruz</span>
              <br />
              in Florida
            </motion.h1>
            
            {/* Mobile Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="md:hidden mb-6"
            >
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                businessStatus.isOpen 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-700 text-gray-200'
              }`}>
                <span className={`h-3 w-3 rounded-full ${
                  businessStatus.isOpen ? 'bg-white animate-pulse' : 'bg-gray-400'
                }`} />
                <span className="text-sm font-bold">{businessStatus.message}</span>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Experience the vibrant flavors of Mexico with our handcrafted tacos, 
              gorditas, and sopes made fresh daily.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/menu" className="btn-primary inline-flex items-center justify-center group">
                View Our Menu
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center justify-center">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose La Vera Cruzana?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We bring the authentic street food experience of Veracruz directly to you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Aggregators Section */}
      <DeliveryAggregators />

      {/* Featured Items Preview */}
      <section className="section-padding bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Signature Dishes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Handcrafted with love, served with pride
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: 'Tacos al Pastor',
                image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600',
                description: 'Marinated pork with pineapple'
              },
              {
                name: 'Gorditas',
                image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=600',
                description: 'Thick corn pockets stuffed with flavor'
              },
              {
                name: 'Fresh Sopes',
                image: 'https://images.unsplash.com/photo-1562059390-a761a084768e?w=600',
                description: 'Traditional Mexican street food'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-200">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/menu" className="btn-primary inline-flex items-center group">
              Explore Full Menu
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl h-96"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0662451337776!2d-81.37924208490964!3d28.538335082449428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77ae9e2c1e0e7%3A0x4e9f1c8e76e2e0e7!2sOrlando%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Vera Cruzana Location"
              />
            </motion.div>

            {/* Hours & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Visit Us Today
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Find us serving authentic Mexican street food at our location. 
                We can't wait to serve you!
              </p>

              <div className="space-y-6">
                <div className="bg-cream p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="text-primary mr-3" />
                    Operating Hours
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Monday - Friday:</span>
                      <span>11:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Saturday - Sunday:</span>
                      <span>10:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 p-6 rounded-xl border-2 border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Weekend Special!
                  </h3>
                  <p className="text-gray-700">
                    Try our famous Barbacoa Tacos every Saturday and Sunday. 
                    Slow-cooked to perfection with traditional spices.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
