import { useTheme } from '../../context/ThemeContext';
import Header from '../Header';
import Footer from '../Footer';

const Collections = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-white'} flex flex-col`}>
      <Header />
      <main className="flex-grow container-custom py-12">
        <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Collections
        </h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Explore our curated collections of products. This page is under construction and will be updated soon with featured collections.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;