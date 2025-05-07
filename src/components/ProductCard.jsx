import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    addToCart(product, 1);
  };
  
  return (
    <motion.div 
      className={`minimal-card h-full flex flex-col overflow-hidden group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative pt-[125%] overflow-hidden bg-gray-100">
          <motion.img 
            src={product.image} 
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Action buttons */}
          <motion.div 
            className={`absolute bottom-0 left-0 right-0 p-3 ${isDarkMode ? 'bg-dark-bg/90' : 'bg-white/90'} backdrop-blur-sm transform transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}
            initial={{ y: 100 }}
            animate={{ y: isHovered ? 0 : 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-2">
              <button 
                className="py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-sm text-sm font-medium hover:opacity-90 transition-opacity"
                onClick={(e) => handleAddToCart(e)}
              >
                Add to Cart
              </button>
              <button 
                className="w-full py-2 bg-gray-800 text-white rounded-sm text-sm font-medium hover:opacity-90 transition-opacity"
                onClick={(e) => {
                  // Allow the Link navigation to happen naturally
                  e.stopPropagation();
                }}
              >
                View Details
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="p-3 flex flex-col flex-grow">
          <div className="mb-2">
            <span className={`text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {product.category}
            </span>
          </div>
          
          <h3 className={`product-title ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {product.title}
          </h3>
          
          <div className="mt-auto pt-2 flex justify-between items-center">
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${product.price.toFixed(2)}
            </span>
            
            <div className="flex items-center">
              <span className={`text-xs mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {product.rating.rate}
              </span>
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;