import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import Footer from '../Footer';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/api';
import ProductCard from '../ProductCard';
import { motion } from 'framer-motion';

const Shop = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
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
    return activeCategory === 'all' || product.category === activeCategory;
  });

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col transition-colors duration-300`}>
      <Header />
      <main className="flex-grow container-custom py-12">
        <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Shop All Products
        </h1>
        
        {/* Category filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? isDarkMode
                      ? 'bg-primary text-white'
                      : 'bg-primary text-white'
                    : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleCategoryChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-20 h-20">
              <div className={`absolute top-0 left-0 w-full h-full border-4 ${isDarkMode ? 'border-primary' : 'border-primary-dark'} border-t-transparent rounded-full animate-spin`}></div>
              <div className={`absolute top-2 left-2 w-16 h-16 border-4 ${isDarkMode ? 'border-secondary' : 'border-secondary-dark'} border-b-transparent rounded-full animate-spin-slow`}></div>
            </div>
          </div>
        ) : error ? (
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;