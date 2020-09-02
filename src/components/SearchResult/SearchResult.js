import React, { useState, useContext, useEffect } from 'react';
import Search from '../search/Search';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchArtists } from '../../services/data';
import artistPlaceholder from '../../assets/artistPlaceholder.svg';

const queryString = require('query-string');

const SearchResult = (props) => {
  const [results, setResults] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const artist = queryString.parse(window.location.search).q;

  useEffect(() => {
    fetchArtists(artist, setResults, token, setToken);
  }, [artist]);

  return (
    <section className="container-fluid artist-search">
      <div className="container">
        <h1>Artists</h1>
        <p>You are currently searching: "{artist}"</p>
        <Search />
        <div className="results d-flex row justify-content-between">
          {results
            ? results.artists.items.map((i) => (
                <div
                  style={{
                    backgroundColor: '#282828',
                    width: '266px',
                    height: '336px',
                    margin: '1rem 0rem',
                  }}
                  className="card text-white"
                >
                  <img
                    style={{
                      margin: '1rem',
                      backgroundColor: '#333333',
                      width: '234px',
                      height: '234px',
                      color: '#B3B3B3',
                    }}
                    className="card-img-top rounded-circle"
                    src={i.images[0] ? i.images[0].url : artistPlaceholder}
                  />
                  <div className="card-body">
                    <p className="card-text">{i.name}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
