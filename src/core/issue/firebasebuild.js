import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {
  fetchIssueSuccess,
  fetchIssueAppRankSuccess,
  fetchLikesQuestionSuccess,
  likeQuestionSuccess,
  dislikeQuestionSuccess
} from './actions'
import get from 'lodash/get';


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

export const buildLikeQuestion = (issueKey) => {
  return dispatch => {
    const currentUserUid = firebaseAuth.currentUser.uid;
    firebaseDb.ref(`issues/${issueKey}`).child('likes').update({[currentUserUid]: true});
    firebaseDb.ref(`users/${currentUserUid}`).child('likes').child('onQuestion').update({[issueKey]: true});
    dispatch(likeQuestionSuccess());
  }
};

export const buildDislikeQuestion = (issueKey) => {
  return dispatch => {
    const currentUserUid = firebaseAuth.currentUser.uid;
    firebaseDb.ref(`issues/${issueKey}`).child(`likes/${currentUserUid}`).remove();
    firebaseDb.ref(`users/${currentUserUid}`).child(`likes/onQuestion/${issueKey}`).remove();
    dispatch(dislikeQuestionSuccess());
  }
};