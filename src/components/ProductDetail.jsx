import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import Header from './Header';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const calculateTransform = (factor) => {
    const x = (mousePosition.x / window.innerWidth - 0.5) * factor;
    const y = (mousePosition.y / window.innerHeight - 0.5) * factor;
    return `translate(${x}px, ${y}px)`;
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
        <Header />
        <div className="container-custom py-20 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <div className={`absolute top-0 left-0 w-full h-full border-4 ${isDarkMode ? 'border-primary' : 'border-primary-dark'} border-t-transparent rounded-full animate-spin`}></div>
              <div className={`absolute top-2 left-2 w-16 h-16 border-4 ${isDarkMode ? 'border-secondary' : 'border-secondary-dark'} border-b-transparent rounded-full animate-spin-slow`}></div>
            </div>
            <p className={`mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
        <Header />
        <div className="container-custom py-20 flex justify-center items-center">
          <div className={`text-center p-8 ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'} rounded-lg shadow-lg max-w-md`}>
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Error</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>{error || 'Product not found'}</p>
            <Link to="/">
              <button className="btn bg-gradient-to-r from-primary to-secondary text-white">Back to Products</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col`}>
      <Header />
      <main className="container-custom py-12 flex-grow relative">
        {/* Background elements */}
        <div className={`absolute inset-0 bg-grid-pattern bg-grid-size ${isDarkMode ? 'opacity-5' : 'opacity-3'} pointer-events-none`}></div>
        
        {isDarkMode && (
          <>
            <div className="absolute top-40 right-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/">
            <motion.button 
              className={`btn ${isDarkMode ? 'glass-effect text-gray-200 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} flex items-center gap-2`}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Products
            </motion.button>
          </Link>
        </motion.div>

        <div className={`${isDarkMode ? 'bg-dark-card border-gray-800' : 'bg-white border-gray-200'} rounded-xl shadow-xl overflow-hidden border`}>
          <div className="md:grid md:grid-cols-2">
            <motion.div 
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-8 flex items-center justify-center relative overflow-hidden`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-radial ${isDarkMode ? 'from-gray-700/30' : 'from-gray-200/50'} to-transparent opacity-70`}></div>
              
              {isDarkMode && (
                <>
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </>
              )}
              
              <motion.div 
                className="relative w-full max-w-md"
                style={{ transform: calculateTransform(15) }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-${isDarkMode ? '30' : '20'} animate-pulse-slow`}></div>
                <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg`}>
                  <motion.img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-[400px] w-full object-contain"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="mb-2 text-sm font-medium text-primary uppercase tracking-wide"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {product.category}
              </motion.div>
              
              <motion.h1 
                className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                {product.title}
              </motion.h1>
              
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </motion.div>
              
              <motion.div 
                className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                ${product.price.toFixed(2)}
              </motion.div>
              
              {/* Tabs for product information */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <div className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mb-4`}>
                  <button 
                    className={`pb-2 px-4 text-sm font-medium ${
                      activeTab === 'description' 
                        ? 'text-primary border-b-2 border-primary' 
                        : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    className={`pb-2 px-4 text-sm font-medium ${
                      activeTab === 'details' 
                        ? 'text-primary border-b-2 border-primary' 
                        : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                  <button 
                    className={`pb-2 px-4 text-sm font-medium ${
                      activeTab === 'reviews' 
                        ? 'text-primary border-b-2 border-primary' 
                        : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </button>
                </div>
                
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {activeTab === 'description' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="leading-relaxed"
                    >
                      {product.description}
                    </motion.p>
                  )}
                  
                  {activeTab === 'details' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Category</div>
                        <div className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>{product.category}</div>
                        
                        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Rating</div>
                        <div className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>{product.rating.rate}/5</div>
                        
                        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Stock</div>
                        <div className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>In Stock</div>
                        
                        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>SKU</div>
                        <div className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>PRD-{product.id}</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        This product has {product.rating.count} reviews with an average rating of {product.rating.rate}/5.
                      </p>
                      <button className="text-primary hover:text-primary-light text-sm font-medium">
                        Write a Review
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                <div className={`flex items-center border rounded-lg overflow-hidden mr-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                  <button 
                    className={`px-3 py-2 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <span className={`px-4 py-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{quantity}</span>
                  <button 
                    className={`px-3 py-2 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {quantity > 1 ? `Total: $${(product.price * quantity).toFixed(2)}` : ''}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <motion.button 
                  className="btn bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20 flex-1 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </motion.button>
                <motion.button 
                  className={`btn ${isDarkMode ? 'glass-effect text-gray-200 hover:bg-gray-700/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Wishlist
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Related products section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-100">
            Related <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Products</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card h-full flex flex-col overflow-hidden border border-gray-800 bg-dark-card group animate-pulse">
                <div className="relative pt-[100%] bg-gray-800"></div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="h-4 bg-gray-700 rounded-full w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded-full w-1/2 mb-4"></div>
                  <div className="mt-auto">
                    <div className="h-8 bg-gray-700 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;