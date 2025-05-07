import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user has a preference stored
  const storedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(
    storedTheme ? storedTheme === 'dark' : true
  );

  useEffect(() => {
    // Apply the theme class to the document element and store preference
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      // Use transition for background color
      document.body.style.transition = 'background-color 0.5s ease';
      document.body.style.backgroundColor = '#0f172a'; // dark bg
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      // Use transition for background color
      document.body.style.transition = 'background-color 0.5s ease';
      document.body.style.backgroundColor = '#ffffff'; // light bg
    }
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};