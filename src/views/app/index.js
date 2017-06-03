import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { paths } from '../routes';
import Header from '../components/partials/Header';
import BottomNav from '../components/partials/BottomNav';


export class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.ISSUES);
    }
  }

  render() {
    return (
      <div>
        <Header
          authenticated={this.props.auth.authenticated}
          signOut={this.props.signOut}
        />

        <BottomNav
          authenticated={this.props.auth.authenticated}
          signOut={this.props.signOut}
        />

        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth})
);

const mapDispatchToProps = (authActions);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
