import React from 'react';
import mainLogo from '../../assets/spoty-search.png';
import ProfileAvatar from '../profile/ProfileAvatar';

const Navbar = () => {
  return (
    <nav className="my-navbar navbar justify-content-center">
      <img className="main-logo" alt="logo" src={mainLogo} />
      <ProfileAvatar />
    </nav>
  );
};

export default Navbar;
