import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authActions } from '../../../core/auth';


const SignIn = ({ signInWithGithub, signInWithGoogle, signInWithTwitter }) => (
  <div className="row align-center sign-in">
    <div className="small-12 column">
      <h1 className="sign-in__heading">Sign in</h1>
      <button
        className="btn sign-in__button"
        onClick={signInWithGithub}
        type="button"
      >GitHub
      </button>
      <button
        className="btn sign-in__button"
        onClick={signInWithGoogle}
        type="button"
      >Google
      </button>
      <button
        className="btn sign-in__button"
        onClick={signInWithTwitter}
        type="button"
      >Twitter
      </button>
      <h6>2017 Appengenie</h6>
    </div>
  </div>
);

SignIn.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
};

export default connect(null, authActions)(SignIn);
