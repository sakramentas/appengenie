import firebase from 'firebase';
import { firebaseAuth } from 'src/core/firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';


const authenticate = provider => {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
};

export const initAuth = user => {
  return {
    type: INIT_AUTH,
    payload: user
  };
};

export const signInError = error => {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
};

export const signInSuccess = result => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
};

export const signInWithGithub = () => {
  return authenticate(new firebase.auth.GithubAuthProvider());
};


export const signInWithGoogle = () => {
  return authenticate(new firebase.auth.GoogleAuthProvider());
};


export const signInWithTwitter = () => {
  return authenticate(new firebase.auth.TwitterAuthProvider());
};

export const signOut = () => {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGN_OUT_SUCCESS
  };
};
