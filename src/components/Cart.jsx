import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();
  const { isDarkMode } = useTheme();
  
  if (!isCartOpen) return null;
  
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Cart panel */}
          <motion.div 
            className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 ${
              isDarkMode ? 'bg-dark-bg border-l border-gray-800' : 'bg-white border-l border-gray-200'
            } shadow-xl overflow-hidden`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Cart header */}
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your Cart ({cartItems.length})
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Cart items */}
              <div className="flex-grow overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <svg className={`w-16 h-16 mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your cart is empty
                    </p>
                    <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Looks like you haven't added any products to your cart yet.
                    </p>
                    <Link to="/shop">
                      <motion.button 
                        className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCartOpen(false)}
                      >
                        Start Shopping
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.li 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          className={`flex items-start p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}
                        >
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-contain object-center p-1"
                            />
                          </div>
                          
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between">
                                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                  {item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title}
                                </h3>
                              </div>
                              <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            
                            <div className="flex flex-1 items-end justify-between mt-2">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className={`px-2 py-1 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                  -
                                </button>
                                <span className={`px-2 py-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className={`px-2 py-1 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                  +
                                </button>
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)}
                                className={`text-sm font-medium ${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'}`}
                              >
                                Remove
                              </motion.button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>
              
              {/* Cart footer */}
              {cartItems.length > 0 && (
                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <div className="flex justify-between mb-4">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subtotal</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                    >
                      Checkout
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearCart}
                      className={`w-full py-2 rounded-md font-medium ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Clear Cart
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;