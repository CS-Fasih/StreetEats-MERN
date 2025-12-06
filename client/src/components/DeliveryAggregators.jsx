import { motion } from 'framer-motion';
import { Truck, ExternalLink } from 'lucide-react';
import { DELIVERY_LINKS } from '../utils/businessStatus';

const DeliveryAggregators = () => {
  const platforms = [
    {
      name: 'DoorDash',
      url: DELIVERY_LINKS.doordash,
      color: 'bg-[#FF3008]',
      hoverColor: 'hover:bg-[#E02A00]',
      logo: '🚪',
      textColor: 'text-white'
    },
    {
      name: 'Uber Eats',
      url: DELIVERY_LINKS.ubereats,
      color: 'bg-[#06C167]',
      hoverColor: 'hover:bg-[#05A556]',
      logo: '🍔',
      textColor: 'text-white'
    },
    {
      name: 'Grubhub',
      url: DELIVERY_LINKS.grubhub,
      color: 'bg-[#F63440]',
      hoverColor: 'hover:bg-[#DC2E3A]',
      logo: '🍕',
      textColor: 'text-white'
    }
  ];

  return (
    <section className="bg-gradient-to-r from-orange-50 to-yellow-50 section-padding" data-delivery-section>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Truck className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Order Delivery Now
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Craving our authentic flavors? Get La Vera Cruzana delivered to your door!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`${platform.color} ${platform.hoverColor} ${platform.textColor} rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className="text-5xl mb-4">{platform.logo}</div>
              <h3 className="text-2xl font-bold mb-3">{platform.name}</h3>
              <div className="flex items-center justify-center space-x-2 text-sm opacity-90">
                <span>Order Now</span>
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile Sticky Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-40 p-3">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Truck className="text-primary" size={20} />
            <span className="font-semibold text-gray-900">Order Delivery:</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${platform.color} ${platform.textColor} py-2 px-3 rounded-lg text-xs font-bold text-center transition-transform active:scale-95`}
              >
                {platform.logo} {platform.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryAggregators;
