import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {issueList} from './issue-list';
import {
  fetchIssuesSuccess,
  fetchIssuesError,
  getMostRecommendedAppIconSuccess
} from './actions';
import {
  buildCreateIssueDataPayload,
  buildCreateIssueAnswerPayload
} from './payload'


export const buildFetchIssues = () => {
  return dispatch => {
    firebaseDb.ref('issues')
      .once('value', snap => {
        const snapshot = snap.val();
        if (snapshot) {
          dispatch(fetchIssuesSuccess(snapshot));
        }
      })
      .catch(err => fetchIssuesError(err))
  }
};

export const buildGetMostRecommendedAppIcon = issueKey => {
  return dispatch => {
    firebaseDb.ref(`answers`).child(issueKey).limitToFirst(1)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          const snapshotFinal = Object.keys(snapshot).map(e => snapshot[e]);
          const appIcon = snapshotFinal[0].appData ? snapshotFinal[0].appData.icon_72 : null;
          dispatch(getMostRecommendedAppIconSuccess(issueKey, appIcon));
        }
      })
      .catch(err => console.error(err))
  }
};

export const buildCreateIssue = (body, uid) => {
  let newIssueKey = firebaseDb.ref('issues').push().key;
  issueList.path = 'issues';
  issueList.update(newIssueKey, buildCreateIssueDataPayload(body, newIssueKey, uid));
  // issueList.update(`${newIssueKey}/user`, buildCreateIssueUserPayload(userInfo));
};

export const buildCreateIssueAnswer = (key, details, answerKey) => {
  let answerPath = `${key}/answers/${answerKey}`;
  issueList.update(answerPath, buildCreateIssueAnswerPayload(details))
};
