import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from '../firebase';

import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from './action-types';

const saveUserInfo = ({ user }) => {
  if (user && user.uid) {
    const { uid, providerId, displayName, photoURL, email } = user;
    const userData = {
      provider: providerId,
      displayName,
      profileImageURL: photoURL,
      lastLoginAt: firebase.database.ServerValue.TIMESTAMP,
      email,
    };
    try {
      firebaseDb.ref(`users/${uid}`).update(userData);
      firebaseDb.ref(`users/${uid}/registeredAt`)
        .transaction(registeredAt => !registeredAt && firebase.database.ServerValue.TIMESTAMP);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  }
};

export const initAuth = user => ({
  type: INIT_AUTH,
  payload: user,
});

export const signInError = error => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const signInSuccess = result => ({
  type: SIGN_IN_SUCCESS,
  payload: result.user,
});

// Auth actions - Need to move all the Firebase functions to a firebasebuild file
const authenticate = provider => (dispatch) => {
  firebaseAuth.signInWithPopup(provider)
    .then((result) => {
      dispatch(signInSuccess(result));
      saveUserInfo(result);
    })
    .catch(error => dispatch(signInError(error)));
};

// OAuth providers
export const signInWithGithub = () => authenticate(new firebase.auth.GithubAuthProvider());
export const signInWithGoogle = () => authenticate(new firebase.auth.GoogleAuthProvider());
export const signInWithTwitter = () => authenticate(new firebase.auth.TwitterAuthProvider());

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOut = () => (dispatch) => {
  firebaseAuth.signOut()
    .then(() => dispatch(signOutSuccess()));
};
