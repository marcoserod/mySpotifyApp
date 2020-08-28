import axios from 'axios';

const storeToken = (setToken, history) => {
  const token = new URL(window.location.href).hash.split('=')[1].split('&')[0];
  console.log(token);
  setToken(token);
  localStorage.setItem('token', token);
  history.replace('/home');
};

const fetchUserData = async (token, setUserData) => {
  let resp = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  try {
    let data = resp.data;
    setUserData(data);
  } catch (err) {
    console.log(err.message);
  }
};

export { storeToken, fetchUserData };
