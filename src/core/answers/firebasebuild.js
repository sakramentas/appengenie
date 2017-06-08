import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {fetchAnswersSuccess} from './actions'


export const buildFetchAnswers = issueKey => {
  return dispatch => {
    firebaseDb.ref(`answers`).child(issueKey)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          dispatch(fetchAnswersSuccess(issueKey, snapshot));
        }
      })
      .catch(err => console.error(err))
  }
};


