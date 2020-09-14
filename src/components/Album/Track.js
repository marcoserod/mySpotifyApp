import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heart } from '@fortawesome/free-regular-svg-icons';
import { AuthContext } from '../../contexts/Auth.context';

const Track = (props) => {
  const { favorites, setFavorites } = useContext(AuthContext);
  const i = props.i;
  const audioPreview = new Audio(i.preview_url);
  const [favorite, setFavorite] = useState(
    favorites.some((el) => el === i.id) || false
  );

  const handleFavorite = (e, id) => {
    e.preventDefault();
    if (favorite) {
      let newfavorites = favorites.filter((i) => i !== id);
      setFavorites(newfavorites);
      localStorage.setItem('favorites', JSON.stringify(newfavorites));
      setFavorite(!favorite);
    } else {
      let newfavorites = [...favorites, id];
      setFavorites(newfavorites);
      localStorage.setItem('favorites', JSON.stringify(newfavorites));
      setFavorite(!favorite);
    }
  };

  return (
    <>
      {props.firstTrack && (
        <div
          className="disc-number"
          style={{
            width: '100%',
            color: '#b3b3b3',
            margin: '1rem 0rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
            }}
          >
            <FontAwesomeIcon icon={faCompactDisc} />
          </span>
          <span>{` Disc ${i.disc_number}`}</span>
        </div>
      )}
      <div
        role="row"
        aria-rowindex={i.track_number}
        tabIndex={0}
        className="track"
      >
        <div className="track-number">{i.track_number}</div>
        <div className="track-name">{i.name}</div>
        <button
          role="gridcell"
          aria-colindex={3}
          onClick={(e) => {
            handleFavorite(e, i.id);
          }}
          className="favorite"
          title={favorite ? 'Remove Favorite' : 'Add Favorite'}
        >
          <FontAwesomeIcon
            color={favorite ? `#1db954` : 'white'}
            icon={favorite ? faHeart : heart}
          />
        </button>
      </div>
    </>
  );
};

export default Track;
