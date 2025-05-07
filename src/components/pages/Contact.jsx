import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import Footer from '../Footer';
import { motion } from 'framer-motion';

const Contact = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col`}>
      <Header />
      <main className="flex-grow container-custom py-12">
        <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have questions or feedback? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className={`mt-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h3>
              <p className="mb-2">Email: info@productcatalog.com</p>
              <p className="mb-2">Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Commerce St, Business City, 12345</p>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'}`}>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className={`w-full px-4 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-primary`} 
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full px-4 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-primary`} 
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className={`w-full px-4 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-primary`} 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;