import React from 'react';
import { artistFallBack } from '../../assets/artistFallback.js';
import { Link } from 'react-router-dom';

const ArtistCard = ({ item }) => {
  return (
    <div className="card artist-card text-white">
      <Link to={`/artists/${item.id}`}>
        <div className="artistFallBack">
          {item && item.images[1] ? (
            <img alt={item.name} className="" src={item.images[1].url} />
          ) : (
            artistFallBack
          )}
        </div>
        <div className="card-body">
          <p className="card-text">{item.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;
