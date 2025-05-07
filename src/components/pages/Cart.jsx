import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import Header from '../Header';
import Footer from '../Footer';

const Cart = () => {
  const { isDarkMode } = useTheme();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col transition-colors duration-300`}>
      <Header />
      <main className="flex-grow container-custom py-12">
        <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Your Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'} text-center`}>
            <div className="flex flex-col items-center justify-center">
              <svg className={`w-24 h-24 mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Your cart is empty
              </h2>
              <p className={`max-w-md mx-auto mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Looks like you haven't added any products to your cart yet.
              </p>
              <motion.button 
                onClick={() => navigate('/shop')}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Products
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm`}>
                <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                
                <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="sm:ml-6 flex-1 mt-4 sm:mt-0">
                        <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h3>
                        <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex items-center">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`px-3 py-1 ${
                              isDarkMode 
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            -
                          </button>
                          <span className={`px-3 py-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={`px-3 py-1 ${
                              isDarkMode 
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className={`ml-4 text-sm font-medium ${
                            isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'
                          }`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className={`p-6 rounded-lg sticky top-24 ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm`}>
                <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Order Summary
                </h2>
                
                <div className={`space-y-4 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex justify-between font-semibold">
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        ${(getCartTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;