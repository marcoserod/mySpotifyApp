import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchUserData } from '../../services/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const ProfileAvatar = (props) => {
  const { userData, setUserData } = useContext(AuthContext);
  const { token, setToken } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (token !== '' && location.pathname !== '/') {
      fetchUserData(token, setUserData, setToken);
    }
  }, [token]);

  const shimmer = <FontAwesomeIcon icon={faUserCircle} />;

  return (
    <div className="profile-avatar">
      {userData && userData.images[0] && location.pathname !== '/' ? (
        <img
          style={{ height: '3rem' }}
          alt={userData.display_name}
          src={`${userData.images[0].url}`}
        />
      ) : (
        shimmer
      )}
    </div>
  );
};

export default ProfileAvatar;
