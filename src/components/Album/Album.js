import React, { useState, useContext, useEffect } from 'react';
import { artistFallBack } from '../../assets/artistFallback';
import Breadcrumb from '../../helpers/Breadcrumb';
import { AuthContext } from '../../contexts/Auth.context';
import { useParams } from 'react-router-dom';
import { fetchAlbumByID, fetchTracksByAlbumID } from '../../services/data';
import Track from './Track';
import BTBreadcrumb from '../../helpers/BTBreadcrumb';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Album = (props) => {
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);
  const albumID = useParams().album;
  const { audio } = useContext(AuthContext);
  const path = album && [
    {
      name: 'home',
      url: '/home',
    },
    {
      name: 'artists',
      url: '/artists',
    },
    {
      name: `${album.artists[0].name}`,
      url: `/artists/${album.artists[0].id}`,
    },
    {
      name: `${album.name}`,
    },
  ];
  const styledSkeleton = (
    <p
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <p style={{ width: '5%' }}>
        <Skeleton duration={1} circle={true} height={20} width={20} />
      </p>
      <p style={{ width: '80%' }}>
        <Skeleton duration={1} />
      </p>
      <p style={{ width: '5%', textAlign: 'end' }}>
        <Skeleton duration={1} circle={true} height={20} width={20} />
      </p>
    </p>
  );

  useEffect(() => {
    fetchAlbumByID(albumID, setAlbum, token, setToken);
    fetchTracksByAlbumID(albumID, userData.country, setTracks, token, setToken);

    return () => {
      audio && audio.pause();
    };
  }, [albumID, audio]);

  if (album && tracks) {
    return (
      <section className="container-fluid album-page">
        <div className="container">
          <div className="d-flex">
            <div className="left">
              {album && album.images[0] ? (
                <img
                  src={album.images[0].url}
                  className="card-img"
                  alt="album"
                />
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
          {album && <BTBreadcrumb arr={path} />}
          <div className="tracks">
            {tracks &&
              tracks.items.map((i, index, arr) => (
                <Track
                  firstTrack={arr[index - 1]?.disc_number !== i.disc_number}
                  key={i.id}
                  i={i}
                />
              ))}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <SkeletonTheme color="transparent" highlightColor="#444">
        <section className="container-fluid album-page">
          <div className="container">
            <div className="d-flex">
              <div className="left">
                <Skeleton duration={1} width={144} height={144} />
              </div>
              <div className="next">
                <h1 style={{ color: 'transparent' }} className="card-title">
                  <Skeleton duration={1} />
                  template
                </h1>
                <p className="card-text">
                  <Skeleton duration={1} />
                </p>
              </div>
            </div>
            <p className="mt-3">
              <Skeleton duration={1} height={32} />
            </p>
            <div className="tracks">
              {styledSkeleton}
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

export default Album;
