import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {getMostRecommendedAppIconSuccess, fetchIssueSuccess} from './actions'


export const buildgetMostRecommendedAppIcon = issueKey => {
  return dispatch => {
    firebaseDb.ref(`answers`).child(issueKey).limitToFirst(1)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          let snapshotFinal = Object.keys(snapshot).map(e => snapshot[e]);
          let appIcon = snapshotFinal[0].appData ? snapshotFinal[0].appData.icon_72 : null;
          dispatch(getMostRecommendedAppIconSuccess(issueKey, appIcon));
        }
      })
      .catch(err => console.error(err))
  }
};

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