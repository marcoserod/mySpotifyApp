import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = (props) => {
  const [artistSearch, setArtistSearch] = useState('');

  return (
    <form
      className="artist-search"
      onSubmit={(e) => {
        e.preventDefault();
        alert(`You've search for ${artistSearch}`);
      }}
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
