import firebase from 'firebase';
import {firebaseAuth, firebaseDb} from 'src/core/firebase';

import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';

// Auth actions - Need to move all the Firebase functions to a firebasebuild file
const authenticate = provider => {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => {
        dispatch(signInSuccess(result));
        saveUserInfo(result)
      })
      .catch(error => dispatch(signInError(error)));
  };
};

const saveUserInfo = ({user}) => {
  if (user && user.uid) {
    const {uid, providerId, displayName, photoURL, email} = user;
    let userData = {
      provider: providerId,
      displayName,
      profileImageURL: photoURL,
      lastLoginAt: firebase.database.ServerValue.TIMESTAMP,
      email: email,
    };
    try {
      firebaseDb.ref(`users/${uid}`).update(userData);
      firebaseDb.ref(`users/${uid}/registeredAt`).transaction((registeredAt) => {
        if (!registeredAt) {
          return firebase.database.ServerValue.TIMESTAMP
        }
      })
    }
    catch (e) {
      console.error(e)
    }
  }
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
