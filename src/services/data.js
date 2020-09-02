import axios from 'axios';

const storeToken = (setToken, history) => {
  const token = new URL(window.location.href).hash.split('=')[1].split('&')[0];
  console.log(token);
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

export { storeToken, fetchUserData };
