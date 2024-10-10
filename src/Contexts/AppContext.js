import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children, products }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([
    'fiction', 
    'non-fiction', 
    'science', 
    'history', 
    'technology'
  ]);

  const [productsState, setProducts] = useState(products);

  const loginUser = (username) => {
    setIsLoggedIn(true);
    setUser(username);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        loginUser,
        logoutUser,
        categories,
        products: productsState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};