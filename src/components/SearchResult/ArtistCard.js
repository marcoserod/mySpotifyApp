import React from 'react';
import { artistFallBack } from '../../assets/artistFallback.js';
import { Link } from 'react-router-dom';

const ArtistCard = (props) => {
  return (
    <div className="card artist-card text-white">
      <Link to={`/artists/${props.i.id}`}>
        <div className="artistFallBack">
          {props.i.images[0] ? (
            <img alt={props.i.name} className="" src={props.i.images[0].url} />
          ) : (
            artistFallBack
          )}
        </div>
        <div className="card-body">
          <p className="card-text">{props.i.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;
