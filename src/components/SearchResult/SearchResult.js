import React, { useState, useContext, useEffect } from 'react';
import Search from '../search/Search';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchArtists } from '../../services/data';
import ArtistCard from './ArtistCard';
import BTBreadcrumb from '../../helpers/BTBreadcrumb';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Artist from '../Artist/Artist';

const queryString = require('query-string');

const SearchResult = (props) => {
  const [results, setResults] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const artist = queryString.parse(window.location.search).q;
  const path = [
    {
      name: 'home',
      url: '/home',
    },
    {
      name: 'Artists',
    },
  ];
  const styledSkeleton = (
    <div style={{ margin: '1rem 0rem' }}>
      <Skeleton width={236} height={300} duration={1} />
    </div>
  );

  useEffect(() => {
    artist && fetchArtists(artist, setResults, token, setToken);
  }, [artist]);

  document.title = 'Spotisearch-ish - Search';

  if (results) {
    return (
      <section className="container-fluid artist-search">
        <div className="container">
          <h1>Artists</h1>
          <p>
            You are currently searching:
            {artist
              ? `"${artist}"`
              : ` Nothing, go ahead and search something below ⬇`}
          </p>
          <Search />
          <BTBreadcrumb arr={path} />
          <div className="results">
            {results &&
              results.artists.items.map((i) => <ArtistCard key={i.id} i={i} />)}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <SkeletonTheme color="transparent" highlightColor="#444">
        <section className="container-fluid artist-search">
          <div className="container">
            <h1>Artists</h1>
            <p>
              You are currently searching:
              {artist
                ? `"${artist}"`
                : ` Nothing, go ahead and search something below ⬇`}
            </p>
            <Search />
            <BTBreadcrumb arr={path} />
            {artist && (
              <div className="results">
                {styledSkeleton}
                {styledSkeleton}
                {styledSkeleton}
                {styledSkeleton}
                {styledSkeleton}
                {styledSkeleton}
                {styledSkeleton}
                {styledSkeleton}
                {styledSkeleton}
              </div>
            )}
          </div>
        </section>
      </SkeletonTheme>
    );
  }
};

export default SearchResult;
