import React, { useState, useContext, useEffect } from 'react';
import Search from '../search/Search';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchArtists } from '../../services/data';
import artistPlaceholder from '../../assets/artistPlaceholder.svg';
import ArtistCard from './ArtistCard';
import Breadcrumbs from '../../helpers/Breadcrumb';

const queryString = require('query-string');

const SearchResult = (props) => {
  const [results, setResults] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const artist = queryString.parse(window.location.search).q;

  useEffect(() => {
    artist && fetchArtists(artist, setResults, token, setToken);
  }, [artist]);

  document.title = 'Spotisearch-ish - Search';
  return (
    <section className="container-fluid artist-search">
      <div className="container">
        <h1>Artists</h1>
        <p>
          You are currently searching:
          {artist
            ? `"${artist}"`
            : ` Nothing, go ahead and search something below ⤵`}
        </p>
        <Search />
        <Breadcrumbs />
        <div className="results d-flex row">
          {results
            ? results.artists.items.map((i) => <ArtistCard key={i.id} i={i} />)
            : null}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
