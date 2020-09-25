import React, { useState, useContext, useEffect } from 'react';
import Search from '../search/Search';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchArtists } from '../../services/data';
import ArtistCard from './ArtistCard';
import BTBreadcrumb from '../../helpers/BTBreadcrumb';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const queryString = require('query-string');

const SearchResult = (props) => {
  const [results, setResults] = useState({ list: [] });
  const [offset, setOffset] = useState(0);
  const { token, setToken, lastSearch } = useContext(AuthContext);
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

  const concatResults = (obj, res) => {
    console.log(res.list);
    setResults({ list: res.list.concat(obj.list) });
  };

  const styledSkeleton = (
    <div style={{ margin: '1rem 0rem' }}>
      <Skeleton width={236} height={300} duration={1} />
    </div>
  );

  const onScroll = () => {
    const isBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (isBottom) {
      setOffset(offset + 20);
      fetchArtists(
        artist,
        offset + 20,
        concatResults,
        token,
        setToken,
        results
      );
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [results]);

  useEffect(() => {
    console.log('tambien me ejecute yo');
    (artist || lastSearch) &&
      fetchArtists(
        artist ? artist : lastSearch,
        0,
        setResults,
        token,
        setToken
      );
    setOffset(0);
  }, [artist]);

  document.title = 'Spotisearch-ish - Search';

  if (results.list.length > 0) {
    return (
      <section className="container-fluid artist-search">
        <div className="container">
          <h1>Artists</h1>
          <p>
            {artist
              ? ` You are currently searching: "${artist}"`
              : ` Your last search was: "${lastSearch}"`}
          </p>
          <Search />
          <BTBreadcrumb arr={path} />
          <div className="results">
            {results.list.map((item, index) => (
              <ArtistCard key={index} item={item} />
            ))}
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
              {artist
                ? `You are currently searching: "${artist}"`
                : lastSearch
                ? ` Your last search was: "${lastSearch}"`
                : ` Nothing, go ahead and search something below ⬇`}
            </p>
            <Search />
            <BTBreadcrumb arr={path} />
            {artist && (
              <div className="results">
                {Array.from({ length: 8 }).map(() => styledSkeleton)}
              </div>
            )}
          </div>
        </section>
      </SkeletonTheme>
    );
  }
};

export default SearchResult;
