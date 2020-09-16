import React, { useState, useEffect, useContext } from 'react';
import { fetchArtistByID, fetchAlbumsByArtistID } from '../../services/data';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';
import Breadcrumbs from '../../helpers/Breadcrumb';
import AlbumCard from '../Album/AlbumCard';
import { artistFallBack } from '../../assets/artistFallback';

const Artist = (props) => {
  const id = useParams().id;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    token && fetchArtistByID(id, setArtist, token, setToken);
    token &&
      fetchAlbumsByArtistID(id, userData.country, setAlbums, token, setToken);
  }, []);

  if (artist) {
    document.title = `Spotisearch-ish - ${artist.name}`;
  }

  return (
    <section className="container-fluid artist-page">
      <div className="container">
        <div className="d-flex">
          <div className="left">
            {artist && artist.images[0] ? (
              <img
                src={artist.images[0].url}
                className="card-img"
                alt="artist"
              />
            ) : (
              <div> {artistFallBack} </div>
            )}
          </div>
          <div className="next">
            <h1 className="card-title">{artist && artist.name}</h1>
            <p className="card-text text-muted">{artist && artist.genres[0]}</p>
          </div>
        </div>
        <Breadcrumbs />
        <div className="albums">
          {albums && albums.items.map((i) => <AlbumCard key={i.id} i={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Artist;
