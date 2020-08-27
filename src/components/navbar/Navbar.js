import React from 'react';
import mainLogo from '../../assets/spoty-search.png';

const Navbar = () => {
  return (
    <nav className="my-navbar navbar justify-content-center">
      <img className="main-logo" alt="logo" src={mainLogo} />
    </nav>
  );
};

export default Navbar;
