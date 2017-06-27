import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {
  fetchIssueSuccess,
  fetchIssueAppRankSuccess,
  fetchLikesQuestionSuccess,
  likeQuestionSuccess,
  dislikeQuestionSuccess,
  fetchAppDataIssueAppRankSuccess,
  fetchAppDataIssueAppRank
} from './actions'
import get from 'lodash/get';

// Fetch all Issues from Firebase
export const buildFetchIssue = issueKey => {
  return dispatch => {
    firebaseDb.ref(`issues`).child(issueKey)
      .once('value', (snap) => {
        const snapshot = snap.val();
        if (snapshot) {
          dispatch(fetchIssueSuccess(snapshot));
        }
      })
      .catch(err => console.error(err))
  }
};

// Fetch AppRank from Firebase - It's getting the first app on the list for now, need to implement a logic later
export const buildFetchIssueAppRank = issueKey => {
  return dispatch => {
    firebaseDb.ref(`answers/${issueKey}`)
      .once('value', (snap) => {
        const snapshot = snap.val();
        if (snapshot) {
          const firstApp = snapshot[Object.keys(snapshot)[0]];
          dispatch(fetchIssueAppRankSuccess(firstApp)); //TODO: CHANGE TO APP RANK LATER, FOR NOW LET'S WORK WITH THE FIRST APP IN THE LIST
          dispatch(fetchAppDataIssueAppRank(issueKey, firstApp.appName));
        }
      })
      .catch(err => console.error(err))
  }
};

// Fetch Likes on question
export const buildFetchLikesQuestion = (issueKey) => {
  return dispatch => {
    firebaseDb.ref(`issues/${issueKey}`)
      .once('value', (snap) => {
        const snapshot = snap.val();
        const likesObj = get(snapshot, 'likes', {});
        if (likesObj) {
          dispatch(fetchLikesQuestionSuccess(likesObj));
        }
      })
      .catch(err => console.error(err))
  }
};

// Like a question
export const buildLikeQuestion = (issueKey) => {
  return dispatch => {
    const currentUserUid = firebaseAuth.currentUser.uid;
    firebaseDb.ref(`issues/${issueKey}`).child('likes').update({[currentUserUid]: true});
    firebaseDb.ref(`users/${currentUserUid}`).child('likes').child('onQuestion').update({[issueKey]: true});
    dispatch(likeQuestionSuccess());
  }
};

// Dislike a question
export const buildDislikeQuestion = (issueKey) => {
  return dispatch => {
    const currentUserUid = firebaseAuth.currentUser.uid;
    firebaseDb.ref(`issues/${issueKey}`).child(`likes/${currentUserUid}`).remove();
    firebaseDb.ref(`users/${currentUserUid}`).child(`likes/onQuestion/${issueKey}`).remove();
    dispatch(dislikeQuestionSuccess());
  }
};

// Fetch the app data from the app rank to show on the issue list
export const buildfetchAppDataIssueAppRank = (issueKey, appName) => {
  return dispatch => {
    firebaseDb.ref(`apps`).child(appName)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          dispatch(fetchAppDataIssueAppRankSuccess(snapshot));
        }
      })
      .catch(err => console.error(err))
  }
};