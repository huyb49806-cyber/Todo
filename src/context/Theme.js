import React, { useState, createContext, useCallback, useContext } from 'react';

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
    const contextValue = {
        theme,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};