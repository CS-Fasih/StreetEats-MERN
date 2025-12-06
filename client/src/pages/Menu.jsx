import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useMenuStore from '../store/menuStore';
import MenuItemCard from '../components/MenuItemCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Filter } from 'lucide-react';

const Menu = () => {
  const { menuItems, loading, error, fetchMenuItems, selectedCategory, setSelectedCategory } = useMenuStore();
  const [filteredItems, setFilteredItems] = useState([]);

  const categories = ['All', 'Tacos', 'Gorditas', 'Sopes', 'Drinks', 'Specials'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, menuItems]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-600 text-white section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-orange-100"
          >
            Authentic Mexican cuisine crafted with passion
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="text-primary" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
            </div>
            <div className="text-sm text-gray-600">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </motion.div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LoadingSkeleton count={6} />
            </div>
          ) : filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🌮</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">
                {selectedCategory === 'All'
                  ? 'Our menu is being updated. Please check back soon!'
                  : `No items available in the ${selectedCategory} category.`}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => (
                <MenuItemCard key={item._id} item={item} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-secondary to-green-700 text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Craving Something Special?</h2>
            <p className="text-xl text-green-100 mb-8">
              Call us to place a custom order or inquire about catering services
            </p>
            <a
              href="tel:4075558226"
              className="inline-block bg-white text-secondary hover:bg-gray-100 font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Call (407) 555-TACO
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
