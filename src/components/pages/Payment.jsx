import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import Header from '../Header';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const { isDarkMode } = useTheme();
  const { clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Get data passed from checkout page
  const { formData, cartTotal } = location.state || { formData: {}, cartTotal: 0 };
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      clearCart(); // Clear the cart after successful payment
    }, 2000);
  };
  
  if (paymentSuccess) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col transition-colors duration-300`}>
        <Header />
        <main className="flex-grow container-custom py-12 flex items-center justify-center">
          <motion.div 
            className={`max-w-md w-full p-8 rounded-lg text-center ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-lg`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Payment Successful!
            </h2>
            
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Thank you for your purchase. Your order has been placed successfully and will be processed shortly.
            </p>
            
            <div className={`p-4 rounded-md mb-6 text-left ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Order Details:
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Order #: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total: ${cartTotal.toFixed(2)}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Shipping to: {formData.firstName} {formData.lastName}
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Link to="/">
                <motion.button 
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Return to Home
                </motion.button>
              </Link>
              
              <Link to="/shop">
                <motion.button 
                  className={`w-full px-6 py-3 rounded-md font-medium ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
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
          Payment
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-lg ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm`}
            >
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Payment Information
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="cardNumber" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength="19"
                    className={`w-full px-4 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                    } focus:outline-none`}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="cardName" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                    } focus:outline-none`}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="expiryDate" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      maxLength="5"
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      } focus:outline-none`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      CVV *
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      maxLength="4"
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      } focus:outline-none`}
                    />
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    'Complete Payment'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-lg sticky top-24 ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm`}>
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Order Summary
              </h2>
              
              <div className={`space-y-4 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(cartTotal / 1.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(cartTotal / 1.1 * 0.1).toFixed(2)}</span>
                </div>
                
                <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between font-semibold">
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Shipping Address
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formData.firstName} {formData.lastName}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formData.address}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formData.city}, {formData.state} {formData.zipCode}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formData.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;