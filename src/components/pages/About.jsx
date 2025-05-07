import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col`}>
      <Header />
      <main className="flex-grow container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            About Product Catalog
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Our Story
              </h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded in 2023, Product Catalog began with a simple mission: to create a seamless shopping experience that connects people with high-quality products from around the world.
              </p>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                What started as a small curated collection has grown into a comprehensive platform featuring products across multiple categories, all while maintaining our commitment to quality and customer satisfaction.
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Today, we continue to expand our offerings while staying true to our founding principles of transparency, quality, and exceptional service.
              </p>
            </div>
            
            <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'} p-6`}>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Our Values
              </h2>
              <ul className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">Quality First</span>
                    <p className="mt-1">We carefully select each product in our catalog to ensure it meets our high standards for quality and durability.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">Customer Satisfaction</span>
                    <p className="mt-1">Your satisfaction is our priority. We're committed to providing exceptional service at every step.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium">Innovation</span>
                    <p className="mt-1">We continuously explore new products and technologies to enhance your shopping experience.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`p-8 rounded-lg mb-16 ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'}`}>
            <h2 className={`text-2xl font-semibold mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Alex Johnson',
                  role: 'Founder & CEO',
                  bio: 'With over 15 years in e-commerce, Alex leads our vision and strategy.'
                },
                {
                  name: 'Sarah Chen',
                  role: 'Head of Product',
                  bio: 'Sarah ensures we offer only the highest quality products in our catalog.'
                },
                {
                  name: 'Marcus Williams',
                  role: 'Customer Experience',
                  bio: 'Marcus works tirelessly to ensure every customer has an exceptional experience.'
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className={`w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{member.role}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Ready to Explore Our Products?
            </h2>
            <Link to="/shop">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default About;