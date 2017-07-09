import { firebaseDb } from '../firebase';
import { fetchUserInfoSuccess, fetchUserInfoProfileSuccess } from './actions';


export const buildFetchUserInfo = uid => (dispatch, key) => {
  firebaseDb.ref('users').child(uid)
    .once('value', (snap) => {
      const snapshot = snap.val();
      if (snapshot) {
        const userData = {
          displayName: snapshot.displayName,
          userImg: snapshot.profileImageURL,
        };
        dispatch(fetchUserInfoSuccess(key, uid, userData));
      }
    })
    .catch(err => console.error(err)); // eslint-disable-line no-console
};

export const buildFetchUserInfoProfile = uid => (dispatch) => {
  firebaseDb.ref('users').child(uid)
    .once('value', (snap) => {
      const snapshot = snap.val();
      if (snapshot) {
        const userData = {
          displayName: snapshot.displayName,
          userImg: snapshot.profileImageURL,
          registeredAt: snapshot.registeredAt,
        };
        dispatch(fetchUserInfoProfileSuccess(uid, userData));
      }
    })
    .catch(err => console.error(err)); // eslint-disable-line no-console
};
