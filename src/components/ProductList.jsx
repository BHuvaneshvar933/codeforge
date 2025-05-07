import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import { fetchProducts } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { isDarkMode } = useTheme();
  
  const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="container-custom py-20 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <div className={`absolute top-0 left-0 w-full h-full border-4 ${isDarkMode ? 'border-primary' : 'border-primary-dark'} border-t-transparent rounded-full animate-spin`}></div>
              <div className={`absolute top-2 left-2 w-16 h-16 border-4 ${isDarkMode ? 'border-secondary' : 'border-secondary-dark'} border-b-transparent rounded-full animate-spin-slow`}></div>
            </div>
            <p className={`mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="container-custom py-20 flex justify-center items-center">
          <div className={`text-center p-8 ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'} rounded-lg shadow-lg max-w-md`}>
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Error</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>{error}</p>
            // Replace regular button elements with motion.button
            <motion.button 
            className="btn bg-gradient-to-r from-primary to-secondary text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            >
            View Products
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col`}>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Hero />
      
      <main className="container-custom py-16 flex-grow">
        <div className="mb-12">
          <motion.h2 
            className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Products
          </motion.h2>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? isDarkMode 
                      ? 'bg-white text-dark-bg' 
                      : 'bg-dark-bg text-white'
                    : isDarkMode 
                      ? 'bg-dark-card text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
          
          {filteredProducts.length === 0 ? (
            <motion.div 
              className={`text-center py-16 rounded-lg ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className={`w-16 h-16 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mx-auto mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <h3 className={`text-xl font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>No products found</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>Try adjusting your search criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className={`btn ${isDarkMode ? 'bg-dark-card text-gray-200 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="product-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}
        </div>
        
        {/* Featured section */}
        <div className="my-20">
          <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <motion.span 
                  className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-4 ${
                    isDarkMode 
                      ? 'bg-primary/20 text-primary-light' 
                      : 'bg-primary/10 text-primary-dark'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Featured Collection
                </motion.span>
                
                <motion.h2 
                  className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Summer Essentials
                </motion.h2>
                
                <motion.p 
                  className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Discover our curated collection of summer essentials. Perfect for the beach, outdoor activities, or just lounging in the sun.
                </motion.p>
                
                <motion.button 
                  className="btn bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20 self-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Collection
                </motion.button>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Summer collection" 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-dark-bg to-transparent' : 'bg-gradient-to-r from-white/50 to-transparent'} md:bg-none`}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter section */}
        <div className="my-20">
          <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'} p-8 md:p-12 text-center`}>
            <motion.h2 
              className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Join Our Newsletter
            </motion.h2>
            
            <motion.p 
              className={`mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Subscribe to our newsletter to receive updates on new products, special offers, and exclusive discounts.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className={`flex-grow px-4 py-3 rounded-sm ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <button 
                className="btn bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20 px-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductList;