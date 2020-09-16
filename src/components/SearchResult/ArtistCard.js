import React from 'react';
import { artistFallBack } from '../../assets/artistFallback.js';
import { Link } from 'react-router-dom';

const ArtistCard = (props) => {
  return (
    <div className="card artist-card text-white">
      <Link to={`/artists/${props.i.id}`}>
        {props.i.images[0] ? (
          <img
            alt={props.i.name}
            className="card-img-top rounded-circle"
            src={props.i.images[0].url}
          />
        ) : (
          <div className="artistFallBack">{artistFallBack}</div>
        )}
        <div className="card-body">
          <p className="card-text">{props.i.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;
