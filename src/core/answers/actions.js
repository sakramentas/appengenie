import firebase from 'firebase';
import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import axios from 'axios';
import {getDeletedAnswer} from './selectors';
import {buildFetchAppsfromApi} from '../engine/endpoints'
import {answerList} from './answer-list';
import {buildFetchAnswers} from './firebasebuild'
import {
  CREATE_ANSWER_ERROR,
  CREATE_ANSWER_SUCCESS,
  CREATE_ANSWER_ANSWER_ERROR,
  CREATE_ANSWER_ANSWER_SUCCESS,
  DELETE_ANSWER_ERROR,
  DELETE_ANSWER_SUCCESS,
  FILTER_ANSWERS,
  LOAD_ANSWERS_SUCCESS,
  FETCH_MOST_RECOMMENDED_APP_DATA_SUCCESS,
  FETCH_APP_ICON_SUCCESS,
  FETCH_APPS_FROM_API_SUCCESS,
  FETCH_ANSWERS_SUCCESS,
  UNDELETE_ANSWER_ERROR,
  UNLOAD_ANSWERS_SUCCESS,
  UPDATE_ANSWER_ERROR,
  UPDATE_ANSWER_SUCCESS,
  FETCH_APPRANK_SUCCESS
} from './action-types';


export const fetchAnswers = (issueKey) => {
  let fetchAnswers = buildFetchAnswers(issueKey);
  return dispatch => fetchAnswers(dispatch)
};

export const fetchAnswersSuccess = (issueKey, data) => ({
  type: FETCH_ANSWERS_SUCCESS,
  payload: {
    issueKey,
    data
  }
});

export const fetchAppsFromApi = (searchTerm) => dispatch => {
  axios(buildFetchAppsfromApi(searchTerm))
    .then(response => dispatch(fetchAppsFromApiSuccess(response.data)))
    .catch(err => console.log(err))
};

export const fetchAppsFromApiSuccess = (data) => ({
  type: FETCH_APPS_FROM_API_SUCCESS,
  payload: data
});

export function listAppRank(issueKey) {
  return dispatch => {
    firebaseDb.ref(`answers`).child(issueKey).limitToFirst(1)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          let snapshotFinal = Object.keys(snapshot).map(e => snapshot[e]);
          dispatch(fetchAppRankSuccess(snapshotFinal[0].appName, snapshotFinal[0].appData))
        }
      });
  };
}

export const fetchAppRankSuccess = (name, data) => ({
  type: FETCH_APPRANK_SUCCESS,
  payload: {
    name,
    data
  }
});

export function createAnswer(issueKey, appName, appData, body, userInfo) {
  return dispatch => {
    let newAnswerKey = firebaseDb.ref().child('answers').push().key;
    let answerData = {
      key: newAnswerKey,
      appName,
      body,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    let answerDataUser = {
      displayName: userInfo.displayName,
      id: userInfo.uid,
      image: userInfo.photoURL
    };
    console.log('CHECK IF HAS KEY --- ', issueKey)
    firebaseDb.ref(`answers/${issueKey}`).child(newAnswerKey).child('appData').update(appData)
    firebaseDb.ref(`answers/${issueKey}`).child(newAnswerKey).update(answerData)
    firebaseDb.ref(`answers/${issueKey}`).child(newAnswerKey).child('user').update(answerDataUser)
    firebaseDb.ref(`issues/${issueKey}`).child('answers').update({[newAnswerKey]: true})
    // answerList.push({body: title})
      .catch(error => dispatch(createAnswerError(error)));
  };
}

// export const checkIfUserLiked = (answerId, type) => {
//   let currentUserUid = firebaseAuth.currentUser.uid;
//   let status = false;
//   if (type === 'answer') {
//     firebaseDb.ref(`users/${currentUserUid}/likes/onAnswer`).once('value', snapshot => {
//       var likedbyUser = snapshot.val();
//       // console.log('UHEUAEHUHHUAEHAEUH KCT', snapshot.val())
//       if (likedbyUser[answerId]) {
//         return status = true
//       }
//     })
//     return status
//   }
// };

// export const likeAnswer = (answerId, issueKey) => {
//   let currentUserUid = firebaseAuth.currentUser.uid;
//   firebaseDb.ref(`users/${currentUserUid}/likes`).once('value', (snapshot) => {
//     console.log('THE SNAPSHOT ', snapshot.val())
//   })
//   // Store userID on answers
//   firebaseDb.ref(`answers/${issueKey}`).child(answerId).child('likes').update({[currentUserUid]: true});
//   // Store answerID on user
//   firebaseDb.ref(`users/${currentUserUid}`).child('likes').child('onAnswer').update({[answerId]: true})
//     .catch(error => console.log(error));
// };
//
// export const dislikeAnswer = (answerId, issueKey) => {
//   let currentUserUid = firebaseAuth.currentUser.uid;
//   firebaseDb.ref(`answers/${issueKey}`).child(answerId).child('likes').remove(currentUserUid)
//     .catch(error => console.log(error));
// };

export function createAnswerError(error) {
  return {
    type: CREATE_ANSWER_ERROR,
    payload: error
  };
}

export function createAnswerSuccess(answer) {
  return {
    type: CREATE_ANSWER_SUCCESS,
    payload: answer
  };
}

export function createAnswerAnswerError(error) {
  return {
    type: CREATE_ANSWER_ANSWER_ERROR,
    payload: error
  };
}

export function createAnswerAnswerSuccess(answer) {
  return {
    type: CREATE_ANSWER_ANSWER_SUCCESS,
    payload: answer
  };
}

export function deleteAnswer(answer) {
  return dispatch => {
    answerList.remove(answer.key)
      .catch(error => dispatch(deleteAnswerError(error)));
  };
}

export function deleteAnswerError(error) {
  return {
    type: DELETE_ANSWER_ERROR,
    payload: error
  };
}

export function deleteAnswerSuccess(answer) {
  return {
    type: DELETE_ANSWER_SUCCESS,
    payload: answer
  };
}

export function undeleteAnswer() {
  return (dispatch, getState) => {
    const answer = getDeletedAnswer(getState());
    if (answer) {
      answerList.set(answer.key, {completed: answer.completed, title: answer.title})
        .catch(error => dispatch(undeleteAnswerError(error)));
    }
  };
}

export function undeleteAnswerError(error) {
  return {
    type: UNDELETE_ANSWER_ERROR,
    payload: error
  };
}

export function updateAnswerError(error) {
  return {
    type: UPDATE_ANSWER_ERROR,
    payload: error
  };
}

export function updateAnswer(answer, changes) {
  return dispatch => {
    answerList.update(answer.key, changes)
      .catch(error => dispatch(updateAnswerError(error)));
  };
}

export function updateAnswerSuccess(answer) {
  return {
    type: UPDATE_ANSWER_SUCCESS,
    payload: answer
  };
}

export function loadAnswersSuccess(answers) {
  console.log('answer success ', answers)
  return {
    type: LOAD_ANSWERS_SUCCESS,
    payload: answers
  };
}

export function filterAnswers(filterType) {
  return {
    type: FILTER_ANSWERS,
    payload: {filterType}
  };
}

export function loadAnswers(issueId) {
  return (dispatch, getState) => {
    answerList.path = `answers/${issueId}`;
    answerList.subscribe(dispatch);
  };
}


export function unloadAnswers() {
  return {
    type: UNLOAD_ANSWERS_SUCCESS
  };
}
