import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as heart,
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-regular-svg-icons';
import { AuthContext } from '../../contexts/Auth.context';

const Track = (props) => {
  const { favorites, setFavorites } = useContext(AuthContext);
  const { audio, setAudio } = useContext(AuthContext);
  const i = props.i;
  const [favorite, setFavorite] = useState(
    favorites.some((el) => el === i.id) || false
  );

  const [showPLay, setShowPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioPreview = new Audio(i.preview_url);

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

  useEffect(() => {
    setPlaying(false);
    setShowPlay(false);
    if (audio && audio.src === audioPreview.src) {
      if (audio.paused) {
        audio.play();
        setPlaying(true);
        setShowPlay(true);
        audio.addEventListener('ended', () => setPlaying(false));
      } else {
        audio.pause();
      }
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }
  }, [audio]);

  return (
    <div>
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
        onMouseOver={() => {
          setShowPlay(true);
        }}
        onFocusCapture={() => {
          setShowPlay(true);
        }}
        onMouseLeave={() => {
          !playing && setShowPlay(false);
        }}
        onBlur={() => {
          !playing && setShowPlay(false);
        }}
        role="row"
        aria-rowindex={i.track_number}
        tabIndex={0}
        className="track"
      >
        <div className="track-number">
          {!showPLay && <span>{i.track_number}</span>}
          <button
            autoFocus={audio && audio.src === audioPreview.src}
            disabled={!audioPreview.src.includes('mp3-preview')}
            onClick={(e) => {
              e.preventDefault();
              if (audio ? audio.paused : audioPreview.paused) {
                setPlaying(true);
                if (audio && audio.src === audioPreview.src) {
                  audio.play();
                } else {
                  setAudio(audioPreview);
                }
              } else {
                setPlaying(false);
                audio.pause();
                if (audio.src !== audioPreview.src) {
                  setAudio(audioPreview);
                }
              }
            }}
            style={!showPLay ? { opacity: '0' } : { opacity: '1' }}
            className="play-pause-btn"
          >
            <FontAwesomeIcon
              style={{
                fontSize: '1.5rem',
              }}
              icon={!playing ? faPlayCircle : faPauseCircle}
            />
          </button>
        </div>
        <div className="track-name">
          <p
            style={{
              margin: '0',
            }}
            className={playing ? 'playing' : ''}
          >
            {i.name}
          </p>
        </div>
        <div className="favorite">
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
      </div>
    </div>
  );
};

export default Track;
