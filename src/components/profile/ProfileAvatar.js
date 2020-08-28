import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { fetchUserData } from '../../services/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ProfileAvatar = (props) => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    token && fetchUserData(token, setUserData);
  }, [userData, token]);

  const shimmer = <FontAwesomeIcon icon={faUserCircle} />;

  return (
    <div className="profile-avatar">
      {userData ? (
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
