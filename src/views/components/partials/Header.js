import React, {Component} from 'react';
import logo from '../../../images/logo5.png'
import {Link} from 'react-router';


const Header = () => {

  return (
    <div className="site-header row align-middle align-center">
      <Link to="/issues" className="link--issues">
        <img src={logo} alt="Appengenie logo"/>
      </Link>
    </div>
  )
};


export default Header;
