import React, { useState } from 'react';
import mainLogo from '../../assets/spoty-search.png';
import ProfileAvatar from '../profile/ProfileAvatar';
import Search from '../search/Search';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <nav className="my-navbar navbar navbar-expand-sm justify-content-between align-items-center">
      <img className="main-logo" alt="logo" src={mainLogo} />
      <div className="d-flex ml-auto row">
        {location.pathname.includes('/artists/') && (
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <div>
              <FontAwesomeIcon color="white" icon={faSearch} />
              <FontAwesomeIcon
                color="white"
                icon={collapsed ? faCaretDown : faCaretUp}
              />
            </div>
          </button>
        )}
        <ProfileAvatar />
      </div>
      <div
        style={{ flexGrow: '0' }}
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        {location.pathname.includes('/artists/') && <Search />}
      </div>
    </nav>
  );
};

export default Navbar;
