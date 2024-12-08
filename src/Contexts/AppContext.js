// Contexts/AppContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

export const AppContext = createContext({
  isLoggedIn: false,
  user: null,
  roles: { user: 'user', editor: 'editor', admin: 'admin' },
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  deleteUser: () => {},
  users: [],
  updateUserRole: () => {},
  products: [],
  setProducts: () => {},
});

export const AppProvider = ({ children, products }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [productsList, setProducts] = useState(products);

  const roles = { user: 'user', editor: 'editor', admin: 'admin' };

  const predefinedUsers = [
    { username: 'Bohdan', password: 'Bohdan', email: 'bohdan@example.com', role: roles.admin },
  ];

// завантаження користувачів із LocalStorage при ініціалізації
  const [users, setUsers] = useState(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    return [...predefinedUsers, ...savedUsers];
  });

// запам'ятання стану входу користувача
  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if (rememberedUser) {
      setIsLoggedIn(true);
      setUser(rememberedUser);
    }
  }, []);

// збереження користувачів у LocalStorage
  const saveUsersToLocalStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  
  const registerUser = (username, password, email, role = roles.user) => {
    const newUser = { username, password, email, role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const loginUser = (usernameOrEmail, password, rememberMe = false) => {
    const user = users.find(
      (user) =>
        (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
        user.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(user));
      }
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('rememberedUser');
  };

  const updateUserRole = (username, newRole) => {
    const updatedUsers = users.map((u) =>
      u.username === username ? { ...u, role: newRole } : u
    );
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const deleteUser = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        roles,
        registerUser,
        loginUser,
        logoutUser,
        deleteUser,
        users,
        updateUserRole,
        products: productsList,
        setProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
