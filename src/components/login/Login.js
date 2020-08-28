import React from 'react';

const CLIENT_ID = 'dddb5b9c3b8b4660a537f71880b695bf';
const REDIRECT_URI = 'https://spotisearch-marcoserod.netlify.app/';

const Login = () => {
  return (
    <section className="login-page">
      <div className="container welcome d-flex align-items-center justify-content-center">
        <h1>
          An App that do the same as Spotify, but worst
          <span role="img" aria-label="smily face">
            😆
          </span>
        </h1>
      </div>
      <div>
        <button
          onClick={() =>
            (window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/auth&scope=user-read-private%20user-read-email&response_type=token&state=123&show_dialog=true`)
          }
        >
          Login with Spotify
        </button>
      </div>
    </section>
  );
};

export default Login;
