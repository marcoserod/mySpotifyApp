import React, { useState, useEffect, useContext } from 'react';
import { fetchArtistByID, fetchAlbumsByArtistID } from '../../services/data';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';
import AlbumCard from '../Album/AlbumCard';
import { artistFallBack } from '../../assets/artistFallback';
import BTBreadcrumb from '../../helpers/BTBreadcrumb';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Artist = (props) => {
  const id = useParams().id;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    token && fetchArtistByID(id, setArtist, token, setToken);
    token &&
      fetchAlbumsByArtistID(id, userData.country, setAlbums, token, setToken);
  }, [id]);

  if (artist) {
    document.title = `Spotisearch-ish - ${artist.name}`;
  }

  const path = artist && [
    {
      name: 'home',
      url: '/home',
    },
    {
      name: 'artists',
      url: '/artists',
    },
    {
      name: `${artist.name}`,
    },
  ];
  const styledSkeleton = (
    <p
      className="mt-3"
      style={
        window.innerWidth > 600
          ? {
              width: '48%',
            }
          : { width: '100%' }
      }
    >
      <Skeleton duration={1} height={144}></Skeleton>
    </p>
  );

  if (artist && albums) {
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
              <p className="card-text text-muted">
                {artist && artist.genres[0]}
              </p>
            </div>
          </div>
          {artist && <BTBreadcrumb arr={path} />}
          <div className="albums">
            {albums && albums.items.map((i) => <AlbumCard key={i.id} i={i} />)}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <SkeletonTheme color="transparent" highlightColor="#444">
        <section className="container-fluid artist-page">
          <div className="container">
            <div className="d-flex">
              <div className="left">
                <Skeleton duration={1} width={144} height={144} />
              </div>
              <div className="next">
                <h1 className="card-title">
                  <p style={{ color: 'transparent' }}>
                    <Skeleton duration={1} /> template
                  </p>
                </h1>
                <p className="card-text text-muted">
                  <Skeleton duration={1} />
                </p>
              </div>
            </div>
            <p className="mt-3 mb-0">
              <Skeleton duration={1} height={32} />
            </p>
            <div className="albums">
              {styledSkeleton}
              {styledSkeleton}
              {styledSkeleton}
              {styledSkeleton}
              {styledSkeleton}
              {styledSkeleton}
              {styledSkeleton}
              {styledSkeleton}
            </div>
          </div>
        </section>
      </SkeletonTheme>
    );
  }
};

export default Artist;
