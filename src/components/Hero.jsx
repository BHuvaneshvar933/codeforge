import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  return (
    <div className={`relative overflow-hidden ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
      {/* Background pattern */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-10' : 'opacity-5'} bg-grid-pattern bg-grid-size`}></div>
      
      {/* Animated gradient orbs */}
      {isDarkMode && (
        <>
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </>
      )}
      
      <div className="container-custom relative z-10 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-block"
            >
              <span className={`px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full ${
                isDarkMode 
                  ? 'bg-primary/20 text-primary-light' 
                  : 'bg-primary/10 text-primary-dark'
              }`}>
                Premium Collection
              </span>
            </motion.div>
            
            <motion.h1 
              className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transform: calculateTransform(10) }}
            >
              Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Amazing</span> Products
            </motion.h1>
            
            <motion.p 
              className={`text-lg md:text-xl mb-8 max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Explore our curated collection of high-quality items from around the world. 
              From fashion to electronics, we have everything you need.
            </motion.p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/shop">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-md font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </Link>
              
              <Link to="/about">
                <motion.button
                  className={`px-6 py-3 rounded-md font-medium border ${
                    isDarkMode 
                      ? 'border-gray-700 text-white hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-800 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </div>
          
          {/* Hero image section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Product showcase" 
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-tr from-dark-bg/70 to-transparent' : 'bg-gradient-to-tr from-white/50 to-transparent'}`}></div>
              
              {/* Floating product cards */}
              <motion.div 
                className={`absolute -bottom-10 -left-10 p-4 rounded-lg shadow-xl ${isDarkMode ? 'bg-dark-card' : 'bg-white'} w-40`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ transform: calculateTransform(-5) }}
              >
                <div className="w-full aspect-square rounded bg-gray-200 mb-2 overflow-hidden">
                  <img 
                    src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Backpack</p>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$109.95</p>
              </motion.div>
              
              <motion.div 
                className={`absolute -top-5 right-10 p-4 rounded-lg shadow-xl ${isDarkMode ? 'bg-dark-card' : 'bg-white'} w-40`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{ transform: calculateTransform(8) }}
              >
                <div className="w-full aspect-square rounded bg-gray-200 mb-2 overflow-hidden">
                  <img 
                    src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Men's Clothing</p>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$22.30</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Featured categories section */}
      <div className={`py-16 ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
        <div className="container-custom">
          <motion.h2 
            className={`text-2xl md:text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shop by Category
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg", path: "/shop/electronics" },
              { name: "Jewelry", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", path: "/shop/jewelry" },
              { name: "Men's Clothing", image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", path: "/shop/men's clothing" },
              { name: "Women's Clothing", image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg", path: "/shop/women's clothing" }
            ].map((category, index) => (
              <div key={category.name}>
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  onClick={() => window.location.href = category.path}
                >
                  <div className="aspect-square overflow-hidden rounded-lg mb-3 relative">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-dark-bg/30' : 'bg-white/30'} group-hover:opacity-0 transition-opacity duration-300`}></div>
                  </div>
                  <h3 className={`text-center font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{category.name}</h3>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;