import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const Search = (props) => {
  const [artistSearch, setArtistSearch] = useState('');
  const history = useHistory();

  function handleSubmit(e, artistSearch) {
    const location = {
      pathname: '/artists',
      search: `?q=${artistSearch}`,
    };
    e.preventDefault();
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
        placeholder="Type the name of your favorite artist"
        onChange={(e) => setArtistSearch(e.target.value)}
      ></input>
    </form>
  );
};

export default Search;
