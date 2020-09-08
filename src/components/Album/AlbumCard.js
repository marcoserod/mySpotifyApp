import React from 'react';

const AlbumCard = (props) => {
  const i = props.i;

  return (
    <div className="album-card">
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
    </div>
  );
};

export default AlbumCard;
