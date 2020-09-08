import React, { createContext, useState } from 'react';

const storageToken = localStorage.getItem('token');
const storageUser = JSON.parse(localStorage.getItem('user'));

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(storageToken || '');
  const [userData, setUserData] = useState(storageUser || null);

  return (
    <AuthContext.Provider value={{ token, setToken, userData, setUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
};
