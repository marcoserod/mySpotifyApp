import React from 'react';
import mainLogo from '../../assets/spoty-search.png';
import ProfileAvatar from '../profile/ProfileAvatar';
import Search from '../search/Search';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="my-navbar navbar justify-content-center align-items-center">
      <img className="main-logo" alt="logo" src={mainLogo} />
      <div className="d-flex row ml-auto justify-content-between mr-1">
        {location.pathname.includes('/artists/') && <Search />}
        <ProfileAvatar />
      </div>
    </nav>
  );
};

export default Navbar;
