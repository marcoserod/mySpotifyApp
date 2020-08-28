import React, { createContext, useState } from 'react';

const storageToken = localStorage.getItem('token');

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(storageToken || '');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};
