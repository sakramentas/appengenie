import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {fetchIssueSuccess, fetchIssueAppRankSuccess} from './actions'


export const buildFetchIssue = issueKey => {
  return dispatch => {
    firebaseDb.ref(`issues`).child(issueKey)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          dispatch(fetchIssueSuccess(snapshot));
        }
      })
      .catch(err => console.error(err))
  }
};

export const buildFetchIssueAppRank = issueKey => {
  return dispatch => {
    firebaseDb.ref(`answers/${issueKey}`)
      .once('value', (snap) => {
        const snapshot = snap.val();
        if (snapshot) {
          dispatch(fetchIssueAppRankSuccess(snapshot[Object.keys(snapshot)[0]])); //TODO: CHANGE TO APP RANK LATER, FOR NOW LET'S WORK WITH THE FIRST APP IN THE LIST
        }
      })
      .catch(err => console.error(err))
  }
};