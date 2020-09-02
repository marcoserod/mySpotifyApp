import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
const queryString = require('query-string');

const storeToken = (setToken, history) => {
  const token = queryString.parse(window.location.hash).access_token;
  setToken(token);
  localStorage.setItem('token', token);
  history.replace('/home');
};

async function fetchUserData(token, setUserData, setToken) {
  await axios
    .get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setUserData(resp.data);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        alert('Your session has expired');
        localStorage.setItem('token', '');
        setToken('');
      }
    });
}

async function fetchArtists(artist, setResults, token, setToken) {
  await axios
    .get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setResults(resp.data);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        alert('Your session has expired');
        localStorage.setItem('token', '');
        setToken('');
      }
    });
}

export { storeToken, fetchUserData, fetchArtists };
