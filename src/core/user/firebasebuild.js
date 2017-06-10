import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {fetchUserInfoSuccess} from './actions'


export const buildFetchUserInfo = uid => {
  return (dispatch, key) => {
    firebaseDb.ref(`users`).child(uid)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          let userData = {
            displayName: snapshot.displayName,
            userImg: snapshot.profileImageURL,
          };
          dispatch(fetchUserInfoSuccess(key, uid, userData));
        }
      })
      .catch(err => console.error(err))
  }
};