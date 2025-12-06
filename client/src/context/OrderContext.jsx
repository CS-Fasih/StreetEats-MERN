import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Truck } from 'lucide-react';
import { PHONE_NUMBER, PHONE_DISPLAY, DELIVERY_LINKS } from '../utils/businessStatus';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orderModal, setOrderModal] = useState({ isOpen: false, item: null });

  const openOrderModal = (item) => {
    setOrderModal({ isOpen: true, item });
  };

  const closeOrderModal = () => {
    setOrderModal({ isOpen: false, item: null });
  };

  return (
    <OrderContext.Provider value={{ openOrderModal, closeOrderModal }}>
      {children}
      
      {/* Order Modal */}
      <AnimatePresence>
        {orderModal.isOpen && orderModal.item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeOrderModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative">
                <img
                  src={orderModal.item.imageUrl}
                  alt={orderModal.item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={closeOrderModal}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-2xl font-bold text-white">{orderModal.item.name}</h3>
                  <p className="text-3xl font-bold text-accent mt-1">
                    ${orderModal.item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{orderModal.item.description}</p>

                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  How would you like to order?
                </h4>

                {/* Order Options */}
                <div className="space-y-3">
                  {/* Call to Order */}
                  <motion.a
                    href={`tel:${PHONE_NUMBER}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between bg-secondary hover:bg-green-700 text-white p-4 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Phone size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">Call to Order</p>
                        <p className="text-sm text-green-100">{PHONE_DISPLAY}</p>
                      </div>
                    </div>
                    <div className="text-2xl group-hover:translate-x-1 transition-transform">→</div>
                  </motion.a>

                  {/* Delivery Options */}
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Truck size={16} className="mr-2" />
                      Or order delivery:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <motion.a
                        href={DELIVERY_LINKS.doordash}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#FF3008] hover:bg-[#E02A00] text-white py-3 px-2 rounded-lg text-xs font-bold text-center transition-colors"
                      >
                        🚪 DoorDash
                      </motion.a>
                      <motion.a
                        href={DELIVERY_LINKS.ubereats}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#06C167] hover:bg-[#05A556] text-white py-3 px-2 rounded-lg text-xs font-bold text-center transition-colors"
                      >
                        🍔 Uber Eats
                      </motion.a>
                      <motion.a
                        href={DELIVERY_LINKS.grubhub}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#F63440] hover:bg-[#DC2E3A] text-white py-3 px-2 rounded-lg text-xs font-bold text-center transition-colors"
                      >
                        🍕 Grubhub
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OrderContext.Provider>
  );
};
