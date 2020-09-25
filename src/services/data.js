import axios from 'axios';

const queryString = require('query-string');

const storeToken = (setToken, history) => {
  const token = queryString.parse(window.location.hash).access_token;
  setToken(token);
  localStorage.setItem('token', token);
  history.replace('/home');
};

const logOut = (setToken) => {
  localStorage.setItem('token', '');
  window.location.reload();
};

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
        logOut(setToken);
      }
      console.log(err);
    });
}

async function fetchArtists(
  artist,
  offset,
  concatResults,
  token,
  setToken,
  results,
  setOffset
) {
  results = results || null;
  await axios
    .get(
      `https://api.spotify.com/v1/search?q=${artist}&type=artist&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((resp) => {
      concatResults({ list: resp.data.artists.items }, results);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logOut(setToken);
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
        logOut(setToken);
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
        logOut(setToken);
      }
      console.log(err);
    });
}

async function fetchAlbumByID(id, setAlbum, token, setToken) {
  await axios
    .get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setAlbum(resp.data);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logOut(setToken);
      }
      console.log(err);
    });
}

async function fetchTracksByAlbumID(id, country, setTracks, token, setToken) {
  await axios
    .get(
      `https://api.spotify.com/v1/albums/${id}/tracks?market=${country}&offset=0&limit=50`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((resp) => {
      setTracks(resp.data);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logOut(setToken);
      }
      console.log(err);
    });
}

async function fetchSeveralTracksByID(
  ids,
  country,
  setTracks,
  token,
  setToken
) {
  await axios
    .get(`https://api.spotify.com/v1/tracks/?ids=${ids}&market=${country}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setTracks(resp.data);
      return resp.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        logOut(setToken);
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
  fetchAlbumByID,
  fetchTracksByAlbumID,
  fetchSeveralTracksByID,
  logOut,
};
