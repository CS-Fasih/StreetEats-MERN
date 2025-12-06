import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { PHONE_NUMBER } from '../utils/businessStatus';

const FloatingCallButton = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only show on mobile devices
  if (!isMobile) return null;

  return (
    <motion.a
      href={`tel:${PHONE_NUMBER}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-secondary hover:bg-green-700 text-white p-4 rounded-full shadow-2xl"
      aria-label="Call to order"
    >
      <Phone size={28} className="animate-pulse" />
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-20" />
    </motion.a>
  );
};

export default FloatingCallButton;
