import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';
import { storeToken } from '../../services/data';

const Auth = (props) => {
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => storeToken(setToken, history), []);

  return <div>Redirecting...</div>;
};

export default Auth;
