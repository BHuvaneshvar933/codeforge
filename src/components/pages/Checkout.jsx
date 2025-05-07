import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import Header from '../Header';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { isDarkMode } = useTheme();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const proceedToPayment = () => {
    navigate('/payment', { 
      state: { 
        formData,
        cartTotal: getCartTotal() * 1.1 // Including tax
      } 
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col transition-colors duration-300`}>
        <Header />
        <main className="flex-grow container-custom py-12">
          <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-dark-card' : 'bg-gray-50'} text-center`}>
            <div className="flex flex-col items-center justify-center">
              <svg className={`w-24 h-24 mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Your cart is empty
              </h2>
              <p className={`max-w-md mx-auto mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You need to add items to your cart before proceeding to checkout.
              </p>
              <Link to="/shop">
                <motion.button 
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Products
                </motion.button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col transition-colors duration-300`}>
      <Header />
      <main className="flex-grow container-custom py-12">
        <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Checkout
        </h1>

        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${activeStep >= 1 ? 'text-primary' : isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 1 ? 'bg-primary text-white' : isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`w-16 h-1 mx-2 ${activeStep >= 2 ? 'bg-primary' : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${activeStep >= 2 ? 'text-primary' : isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 2 ? 'bg-primary text-white' : isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
            <div className={`w-16 h-1 mx-2 ${activeStep >= 3 ? 'bg-primary' : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${activeStep >= 3 ? 'text-primary' : isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 3 ? 'bg-primary text-white' : isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeStep === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm`}
              >
                <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Shipping Information
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                        } focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                        } focus:outline-none`}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      } focus:outline-none`}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      } focus:outline-none`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                        } focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                        } focus:outline-none`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="zipCode" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                        } focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                        } focus:outline-none`}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      } focus:outline-none`}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue to Review
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {activeStep === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm`}
              >
                <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Review Order
                </h2>
                
                <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Shipping Information
                  </h3>
                  <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.country}</p>
                    <p>Email: {formData.email}</p>
                    <p>Phone: {formData.phone}</p>
                  </div>
                </div>
                
                <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Order Items
                  </h3>
                  <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 flex items-center">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.title}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <motion.button
                    onClick={() => setActiveStep(1)}
                    className={`px-6 py-3 rounded-md font-medium ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to Shipping
                  </motion.button>
                  
                  <motion.button
                    onClick={proceedToPayment}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Payment
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <motion.div 
              className={`p-6 rounded-lg sticky top-24 ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
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
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;