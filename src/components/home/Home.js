import React, { useState, useContext, useEffect } from 'react';
import Search from '../search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchSeveralTracksByID, logOut } from '../../services/data';
import { Link, useHistory } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Home = (props) => {
  const [tracks, setTracks] = useState(null);
  const {
    setAudio,
    favorites,
    userData,
    token,
    setToken,
    setFavorites,
  } = useContext(AuthContext);
  const favoritesCSL = favorites.join();
  const history = useHistory();
  const smallDeviceOnLoad = window.innerWidth > 600 ? 190 : 150;
  document.title = 'Spotisearch-ish';

  useEffect(() => {
    if (token && favorites.length !== 0) {
      fetchSeveralTracksByID(
        favoritesCSL,
        userData.country,
        setTracks,
        token,
        setToken
      );
    }
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

        <>
          {favorites.length !== 0 && <h2 className="favorites">Favorites</h2>}
          {favorites.length !== 0 && tracks ? (
            <div className="favorites">
              {tracks.tracks.map((item, index) => (
                <div
                  key={index}
                  className="track-card"
                  style={{
                    position: 'relative',
                  }}
                >
                  {item.album.images[1] ? (
                    <img src={item.album.images[1].url} />
                  ) : null}
                  <button
                    onClick={() => {
                      setAudio(new Audio(item.preview_url));
                      history.push(
                        `/artists/${item.artists[0].id}/${item.album.id}`
                      );
                    }}
                    className="homePlayBtn"
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      height: '2rem',
                      width: '2rem',
                      position: 'absolute',
                      top: 0,
                      border: 'none',
                      background: 'transparent',
                      padding: '50%',
                      margin: 0,
                    }}
                  >
                    <div className="icon">
                      <FontAwesomeIcon
                        color=" #1db954"
                        size="3x"
                        icon={faPlay}
                        transform={'white'}
                      ></FontAwesomeIcon>
                    </div>
                  </button>
                  <p className="track-name">{item.name}</p>
                  <div className="artists">
                    {item.artists.map((item) => (
                      <Link key={item.id} to={`/artists/${item.id}`}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div
                    className="removeFav d-flex justify-content-end"
                    style={{ width: '100%', position: 'absolute', bottom: '0' }}
                  >
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Remove Favorite"
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
          ) : (
            favorites.length !== 0 && (
              <SkeletonTheme color="transparent" highlightColor="#444">
                <div className="favorites">
                  <p className="mt-3 mr-3">
                    <Skeleton
                      width={smallDeviceOnLoad}
                      height={266}
                      duration={1}
                    />
                  </p>
                  <p className="mt-3 mr-3">
                    <Skeleton
                      width={smallDeviceOnLoad}
                      height={266}
                      duration={1}
                    />
                  </p>
                  <p className="mt-3 mr-3">
                    <Skeleton
                      width={smallDeviceOnLoad}
                      height={266}
                      duration={1}
                    />
                  </p>
                  <p className="mt-3 mr-3">
                    <Skeleton
                      width={smallDeviceOnLoad}
                      height={266}
                      duration={1}
                    />
                  </p>
                  <p className="mt-3 mr-3">
                    <Skeleton
                      width={smallDeviceOnLoad}
                      height={266}
                      duration={1}
                    />
                  </p>
                  <p className="mt-3 mr-3">
                    <Skeleton
                      width={smallDeviceOnLoad}
                      height={266}
                      duration={1}
                    />
                  </p>
                </div>
              </SkeletonTheme>
            )
          )}
        </>
      </div>
    </section>
  );
};

export default Home;
