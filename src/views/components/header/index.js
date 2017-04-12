import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const Header = ({authenticated, signOut}) => {
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <h1 className="header__title"><Link to="/">LookApp</Link></h1>

          <ul className="header__actions">
            {authenticated ?
              <div>
                <li>
                  <button className="btn" onClick={signOut}>Sign out</button>
                </li>
                <li>
                  <button className="btn"><Link to="/issues">Issues</Link></button>
                </li>
              </div>
              : null}
            {/*<li><a className="link link--github" href="https://github.com/r-park/todo-react-redux"></a></li>*/}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
