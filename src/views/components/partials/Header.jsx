import React from 'react';
import { Link } from 'react-router';
import logo from '../../../images/logo5.png';


const Header = () => (
  <div className="site-header row align-middle align-center">
    <Link
      to="/issues"
      className="link--issues"
    >
      <img
        src={logo}
        alt="Appengenie logo"
      />
    </Link>
  </div>
);


export default Header;
