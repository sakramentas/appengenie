import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconCached from 'material-ui/svg-icons/action/home';


const nearbyIcon = <IconLocationOn />;
const cachedIcon = <IconCached />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
const BottomNav = ({authenticated, signOut}) => {
  // let select = (index) => this.setState({selectedIndex: index});

  return (
    <Paper zDepth={1}>
      {authenticated ?
        <BottomNavigation>
          <Link to="#" className="link--issues">
            <BottomNavigationItem
              label="Sign-out"
              icon={cachedIcon}
              onClick={signOut}
            />
          </Link>
          <Link to="/" className="link--issues">
            <BottomNavigationItem
              label="Favorites"
              icon={cachedIcon}
            />
          </Link>
          <Link to="/issues" className="link--issues">
            <BottomNavigationItem
              label="Issues"
              icon={nearbyIcon}
            />
          </Link>
        </BottomNavigation>
        : null}
    </Paper>
  );

};

export default BottomNav;