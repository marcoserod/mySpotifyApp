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

// axios.interceptors.response.use((resp) => {
//   if (resp.status === 401) {
//     alert('explota todoooooo');
//   }
//   return resp.status;
// });

async function fetchUserData(token, setUserData, setToken) {
  await axios
    .get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setUserData(resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data, null));
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
      console.log(err);
    });
}

async function fetchArtistByID(id, setArtist, token, setToken) {
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setArtist(resp.data);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        alert('Your session has expired');
        localStorage.setItem('token', '');
        setToken('');
      }
      console.log(err);
    });
}

async function fetchAlbumsByArtistID(id, country, setAlbums, token, setToken) {
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}/albums?market=${country}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setAlbums(resp.data);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        localStorage.setItem('token', '');
        setToken('');
        alert('Your session has expired');
      }
      console.log(err);
    });
}

export {
  storeToken,
  fetchUserData,
  fetchArtists,
  fetchArtistByID,
  fetchAlbumsByArtistID,
};
