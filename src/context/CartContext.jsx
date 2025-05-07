import { createContext, useContext, useState, useEffect } from 'react';
import Notification from '../components/Notification';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
  });
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const showNotification = (message) => {
    setNotification({
      isVisible: true,
      message,
    });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({
        isVisible: false,
        message: '',
      });
    }, 3000);
  };
  
  const hideNotification = () => {
    setNotification({
      isVisible: false,
      message: '',
    });
  };
  
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        showNotification(`Updated quantity of ${product.title} in your cart`);
        return updatedItems;
      } else {
        // Add new item to cart
        showNotification(`Added ${product.title} to your cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId) => {
    const productToRemove = cartItems.find(item => item.id === productId);
    if (productToRemove) {
      showNotification(`Removed ${productToRemove.title} from your cart`);
    }
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    showNotification('Your cart has been cleared');
  };
  
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
      isCartOpen,
      setIsCartOpen,
      toggleCart
    }}>
      {children}
      <Notification 
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </CartContext.Provider>
  );
};