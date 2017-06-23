import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import get from 'lodash/get'
import {
  fetchAnswersSuccess,
  fetchLikesAnswerSuccess,
  createAnswerSuccess,
  createAnswerKeyOnUserRef,
  createAnswerKeyOnUserRefSuccess,
  likeAnswerSuccess,
  dislikeAnswerSuccess,
  fetchAppDataAnswerSuccess
} from './actions'
import {
  buildCreateAnswerDataPayload,
  buildCreateAnswerUserPayload
} from './payload'


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

export const buildCreateAnswer = (issueKey, appName, appData, body, userInfo) => {
  return dispatch => {
    try {
      const newAnswerKey = firebaseDb.ref().child('answers').push().key;
      const answerRef = firebaseDb.ref(`answers/${issueKey}`).child(newAnswerKey);
      answerRef.update(buildCreateAnswerDataPayload(newAnswerKey, appName, body));
      answerRef.child('user').update(buildCreateAnswerUserPayload(userInfo));
      firebaseDb.ref(`apps/${appData.title}`).update(appData);
      dispatch(createAnswerSuccess());
      createAnswerKeyOnUserRef(issueKey, newAnswerKey)
    }
    catch (err) {
      console.error(err)
    }
  };
};

export const buildCreateAnswerKeyOnUserRef = (issueKey, newAnswerKey) => {
  return dispatch => {
    firebaseDb.ref(`issues/${issueKey}`).child('answers').update({[newAnswerKey]: true})
    dispatch(createAnswerKeyOnUserRefSuccess())
  }
};

export const buildFetchLikesAnswer = (answerKey, issueKey) => {
  return dispatch => {
    firebaseDb.ref(`answers/${issueKey}`).child(answerKey)
      .once('value', (snap) => {
        const snapshot = snap.val();
        const likesObj = get(snapshot, 'likes', {});
        if (likesObj) {
          dispatch(fetchLikesAnswerSuccess(answerKey, likesObj));
        }
      })
      .catch(err => console.error(err))
  }
};

export const buildLikeAnswer = (answerKey, issueKey) => {
  return dispatch => {
    let currentUserUid = firebaseAuth.currentUser.uid;
    firebaseDb.ref(`answers/${issueKey}`).child(answerKey).child('likes').update({[currentUserUid]: true});
    firebaseDb.ref(`users/${currentUserUid}`).child('likes').child('onAnswer').update({[answerKey]: true});
    dispatch(likeAnswerSuccess());
  }
};

export const buildDislikeAnswer = (answerKey, issueKey) => {
  return dispatch => {
    let currentUserUid = firebaseAuth.currentUser.uid;
    firebaseDb.ref(`answers/${issueKey}`).child(`${answerKey}/likes/${currentUserUid}`).remove();
    firebaseDb.ref(`users/${currentUserUid}`).child(`likes/onAnswer/${answerKey}`).remove();
    dispatch(dislikeAnswerSuccess());
  }
};

export const buildfetchAppDataAnswer = (answerKey, appName) => {
  return dispatch => {
    firebaseDb.ref(`apps`).child(appName)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          dispatch(fetchAppDataAnswerSuccess(answerKey, snapshot));
        }
      })
      .catch(err => console.error(err))
  }
};