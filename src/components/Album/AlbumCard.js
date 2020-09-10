import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AlbumCard = (props) => {
  const pathname = useLocation().pathname;
  const i = props.i;

  return (
    <div className="album-card">
      <Link to={`${pathname}/${i.id}`}>
        <img alt="album" src={i.images[0] ? i.images[1].url : null} />
        <div className="album-info">
          <p>{i.name}</p>
          <p>
            <small>{i.release_date.split('-')[0]}</small>
          </p>
          <p>
            <small>{i.total_tracks} tracks</small>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AlbumCard;
