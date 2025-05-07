import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = () => {
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
  
  const calculateTransform = (factor, delay) => {
    const x = (mousePosition.x / window.innerWidth - 0.5) * factor;
    const y = (mousePosition.y / window.innerHeight - 0.5) * factor;
    return { x, y, transition: { type: 'spring', stiffness: 75, damping: 15, delay } };
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className={`absolute inset-0 bg-grid-pattern bg-grid-size ${isDarkMode ? 'opacity-5' : 'opacity-3'}`}></div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl ${
          isDarkMode ? 'bg-primary/10 opacity-20' : 'bg-primary/5 opacity-30'
        }`}
        animate={calculateTransform(30, 0)}
      />
      <motion.div 
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl ${
          isDarkMode ? 'bg-secondary/10 opacity-20' : 'bg-secondary/5 opacity-30'
        }`}
        animate={calculateTransform(20, 0.1)}
      />
      <motion.div 
        className={`absolute top-3/4 right-1/3 w-64 h-64 rounded-full filter blur-3xl ${
          isDarkMode ? 'bg-accent/10 opacity-10' : 'bg-accent/5 opacity-20'
        }`}
        animate={calculateTransform(40, 0.2)}
      />
      
      {/* Small particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            isDarkMode ? 'bg-primary/30' : 'bg-primary/20'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 10 - 5],
            x: [0, Math.random() * 10 - 5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;