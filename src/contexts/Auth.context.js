import React, { createContext, useState } from 'react';

const storageToken = localStorage.getItem('token');
const storageUser = JSON.parse(localStorage.getItem('user'));
const storageFav = JSON.parse(localStorage.getItem('favorites'));

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(storageToken || '');
  const [userData, setUserData] = useState(storageUser || null);
  const [favorites, setFavorites] = useState(storageFav || []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        favorites,
        setFavorites,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
