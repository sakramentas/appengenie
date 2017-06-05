import React from 'react';
import {Link} from 'react-router';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconList from 'material-ui/svg-icons/action/view-list';
import IconExit from 'material-ui/svg-icons/action/exit-to-app';
import IconTrends from 'material-ui/svg-icons/action/trending-up';


const iconExit = <IconExit />;
const iconTrends = <IconTrends />;
const iconList = <IconList />;

const BottomNav = ({authenticated, signOut}) => {

  return (
    <Paper zDepth={1}>
      {authenticated ?
        <BottomNavigation>
          <Link to="#" className="link--issues">
            <BottomNavigationItem
              label="Sign-out"
              icon={iconExit}
              onClick={signOut}
            />
          </Link>
          <Link to="/" className="link--issues">
            <BottomNavigationItem
              label="Trends"
              icon={iconTrends}
            />
          </Link>
          <Link to="/issues" className="link--issues">
            <BottomNavigationItem
              label="Wishes"
              icon={iconList}
            />
          </Link>
        </BottomNavigation>
        : null}
    </Paper>
  );

};

export default BottomNav;
