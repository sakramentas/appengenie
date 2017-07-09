import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from '../../core/auth';
import { paths } from '../routes';
import Header from '../components/partials/Header';


class App extends Component {

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
        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

App.propTypes = {
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.object, // eslint-disable-line
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  getAuth,
  auth => ({ auth }),
);

const mapDispatchToProps = (authActions);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
