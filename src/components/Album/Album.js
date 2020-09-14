import React, { useState, useContext, useEffect } from 'react';
import { artistFallBack } from '../../assets/artistFallback';
import Breadcrumb from '../../helpers/Breadcrumb';
import { AuthContext } from '../../contexts/Auth.context';
import { useParams } from 'react-router-dom';
import { fetchAlbumByID, fetchTracksByAlbumID } from '../../services/data';
import Track from './Track';

const Album = (props) => {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);
  const albumID = useParams().album;
  const allAudios = document.getElementsByTagName('audio');
  console.log(allAudios);

  useEffect(() => {
    fetchAlbumByID(albumID, setAlbum, token, setToken);
    fetchTracksByAlbumID(albumID, userData.country, setTracks, token, setToken);
  }, [albumID]);

  return (
    <section className="container-fluid album-page">
      <div className="container">
        <div className="d-flex">
          <div className="left">
            {album && album.images[0] ? (
              <img src={album.images[0].url} className="card-img" alt="album" />
            ) : (
              <div> {artistFallBack} </div>
            )}
          </div>
          <div className="next">
            <h1 className="card-title">{album && album.name}</h1>
            <p className="card-text">
              {album &&
                `${album.artists[0].name} - ${
                  album.release_date.split('-')[0]
                }`}
            </p>
          </div>
        </div>
        <Breadcrumb />
        <div className="tracks">
          {tracks && tracks.items.map((i) => <Track key={i.id} i={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Album;
