import { firebaseDb } from '../firebase';
import { issueList } from './issue-list';
import {
  fetchIssuesSuccess,
  fetchIssuesError,
  getMostRecommendedAppIconSuccess,
  fetchLikesQuestionSuccess,
} from './actions';
import {
  buildCreateIssueDataPayload,
  buildCreateIssueAnswerPayload,
} from './payload';

export const buildFetchIssues = () => (dispatch) => {
  firebaseDb.ref('issues')
    .once('value', (snap) => {
      const snapshot = snap.val();
      if (snapshot) {
        dispatch(fetchIssuesSuccess(snapshot));
      }
    })
    .catch(err => fetchIssuesError(err));
};

export const buildGetMostRecommendedAppIcon = issueKey => (dispatch) => {
  firebaseDb.ref('answers').child(issueKey).limitToFirst(1)
    .once('value', (snap) => {
      const snapshot = snap.val();
      if (snapshot) {
        const snapshotFinal = Object.keys(snapshot).map(e => snapshot[e]);
        if (snapshotFinal[0].appData) {
          const appIcon = snapshotFinal[0].appData.icon_72;
          dispatch(getMostRecommendedAppIconSuccess(issueKey, appIcon));
        } else {
          const appName = snapshotFinal[0].appName;
          firebaseDb.ref(`apps/${appName}`)
            .once('value', (snap2) => {
              const snapshot2 = snap2.val();
              if (snapshot2) {
                const appIcon = snapshot2.icon_72;
                dispatch(getMostRecommendedAppIconSuccess(issueKey, appIcon));
              }
            });
        }
      }
    })
    .catch(err => console.error(err)); // eslint-disable-line no-console
};

export const buildCreateIssue = (body, uid) => {
  const newIssueKey = firebaseDb.ref('issues').push().key;
  issueList.path = 'issues';
  issueList.update(newIssueKey, buildCreateIssueDataPayload(body, newIssueKey, uid));
  // issueList.update(`${newIssueKey}/user`, buildCreateIssueUserPayload(userInfo));
};

export const buildCreateIssueAnswer = (key, details, answerKey) => {
  const answerPath = `${key}/answers/${answerKey}`;
  issueList.update(answerPath, buildCreateIssueAnswerPayload(details));
};

export const buildFetchLikesQuestion = issueKey => (dispatch) => {
  firebaseDb.ref(`issues/${issueKey}/likes`)
    .once('value', (snap) => {
      const snapshot = snap.val();
      // const likesObj = get(snapshot, 'likes', {});
      // if (likesObj) {
      dispatch(fetchLikesQuestionSuccess(issueKey, snapshot));
      // }
    })
    .catch(err => console.error(err)); // eslint-disable-line no-console
};
