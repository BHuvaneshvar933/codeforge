import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';

// Import page components
import Shop from './components/pages/Shop';
import Collections from './components/pages/Collections';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Payment from './components/pages/Payment';
import Home from './components/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Add other routes as needed */}
            </Routes>
          </AnimatePresence>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
