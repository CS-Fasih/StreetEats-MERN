import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">La Vera Cruzana</h3>
            <p className="text-gray-300 mb-4">
              Bringing the authentic flavors of Veracruz, Mexico to Florida. 
              Every dish is crafted with passion and traditional recipes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-accent transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-accent transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="text-accent mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-300">
                  123 Food Truck Lane<br />
                  Orlando, FL 32801
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-accent flex-shrink-0" size={20} />
                <span className="text-gray-300">(407) 555-TACO</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-accent flex-shrink-0" size={20} />
                <span className="text-gray-300">info@laveracruzana.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Clock className="text-accent mt-1 flex-shrink-0" size={20} />
                <div className="text-gray-300">
                  <p className="font-semibold">Monday - Friday</p>
                  <p>11:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 ml-8">
                <div className="text-gray-300">
                  <p className="font-semibold">Saturday - Sunday</p>
                  <p>10:00 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} La Vera Cruzana. All rights reserved.</p>
          <p className="mt-2 text-sm">Made with ❤️ and authentic Mexican recipes</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
