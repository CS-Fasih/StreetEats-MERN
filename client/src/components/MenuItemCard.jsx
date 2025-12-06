import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

const MenuItemCard = ({ item }) => {
  const { openOrderModal } = useOrder();

  const handleOrder = () => {
    openOrderModal(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer relative"
    >
      {/* Availability Badge */}
      {!item.isAvailable && (
        <div className="absolute inset-0 bg-gray-900/75 z-20 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl transform -rotate-12">
              <p className="text-2xl font-bold">SOLD OUT</p>
              <p className="text-sm mt-1">Check back soon!</p>
            </div>
          </div>
        </div>
      )}

      {/* Featured Badge */}
      {item.featured && item.isAvailable && (
        <div className="absolute top-4 right-4 bg-accent text-gray-900 px-3 py-1 rounded-full text-sm font-semibold z-10 flex items-center space-x-1">
          <Star size={14} fill="currentColor" />
          <span>Popular</span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            !item.isAvailable ? 'grayscale opacity-60' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <span className="text-2xl font-bold text-primary ml-2">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
            {item.category}
          </span>

          {item.isAvailable && (
            <motion.button
              onClick={handleOrder}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary text-white p-2 rounded-full hover:bg-orange-700 transition-colors shadow-lg"
              title="Order this item"
            >
              <ShoppingCart size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
