import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';

const Search = (props) => {
  const [artistSearch, setArtistSearch] = useState('');
  const history = useHistory();
  const location = useLocation();
  const { setLastSearch } = useContext(AuthContext);

  function handleSubmit(e, artistSearch) {
    const location = {
      pathname: '/artists',
      search: `?q=${artistSearch}`,
    };
    e.preventDefault();
    setLastSearch(artistSearch);
    history.push(location);
  }

  return (
    <form
      className="artist-search"
      onSubmit={(e) => handleSubmit(e, artistSearch)}
    >
      <span>
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input
        value={artistSearch}
        placeholder={
          location.pathname.includes('/artists/')
            ? 'Search for another artist'
            : 'Type the name of your favorite artist'
        }
        onChange={(e) => setArtistSearch(e.target.value)}
      ></input>
    </form>
  );
};

export default Search;
