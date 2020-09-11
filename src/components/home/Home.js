import React, { useState, useContext, useEffect } from 'react';
import Search from '../search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchSeveralTracksByID } from '../../services/data';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [tracks, setTracks] = useState(null);
  const { favorites, userData, token, setToken, setFavorites } = useContext(
    AuthContext
  );
  const favoritesCSL = favorites.join();
  document.title = 'Spotisearch-ish';

  useEffect(() => {
    fetchSeveralTracksByID(
      favoritesCSL,
      userData.country,
      setTracks,
      token,
      setToken
    );
  }, [favorites]);

  const removeFav = (id) => {
    const index = favorites.indexOf(id);
    if (index > -1) {
      let updatedFavs = favorites.filter((item) => item !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavs));
      setFavorites(updatedFavs);
    }
  };

  return (
    <section className="home-page container-fluid">
      <div className="container">
        <h1>
          Welcome to <div id="app-name">Spotisearch-ish</div>
        </h1>
        <h4>
          Search your favorite songs over spotify, just enter an artist's name
          in the following search box and enjoy!
        </h4>
        <Search />
        {console.log(favorites)}

        <>
          {favorites.length !== 0 && <h2 className="favorites">Favorites</h2>}
          {favorites.length !== 0 && tracks && (
            <div className="favorites">
              {tracks.tracks.map((item) => (
                <div
                  className="track-card"
                  style={{
                    margin: '1rem 0.25rem',
                  }}
                >
                  {item.album.images[1] ? (
                    <img src={item.album.images[1].url} />
                  ) : null}
                  <p className="track-name"> {item.name}</p>
                  <div className="artists">
                    {item.artists.map((item) => (
                      <Link to={`/artists/${item.id}`}>{item.name}</Link>
                    ))}
                  </div>
                  <div
                    className="removeFav d-flex justify-content-end"
                    style={{ width: '100%', position: 'absolute', bottom: '0' }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFav(item.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </section>
  );
};

export default Home;
