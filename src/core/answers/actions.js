import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import axios from 'axios';
import {buildFetchAppsfromApi} from '../engine/endpoints'
import {
  buildFetchAnswers,
  buildCreateAnswer,
  buildCreateAnswerKeyOnUserRef,
  buildFetchLikesAnswer,
  buildLikeAnswer
} from './firebasebuild'
import {
  CREATE_ANSWER_ERROR,
  CREATE_ANSWER_SUCCESS,
  CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS,
  FILTER_ANSWERS,
  FETCH_LIKES_ANSWER_SUCCESS,
  FETCH_APPS_FROM_API_SUCCESS,
  FETCH_ANSWERS_SUCCESS,
  UNLOAD_ANSWERS_SUCCESS,
} from './action-types';


export const fetchAnswers = (issueKey) => {
  const fetchAnswers = buildFetchAnswers(issueKey);
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

export const createAnswer = (issueKey, appName, appData, body, userInfo) => {
  const createBuildCreateAnswer = buildCreateAnswer(issueKey, appName, appData, body, userInfo);
  return dispatch => createBuildCreateAnswer(dispatch)
};

export const createAnswerSuccess = () => ({ //TODO: REINTEGRATE THE APPS COMING FROM API LATER
  type: CREATE_ANSWER_SUCCESS
});

export const createAnswerKeyOnUserRef = (issueKey, newAnswerKey) => {
  const createBuildCreateAnswerKeyOnUserRef = buildCreateAnswerKeyOnUserRef(issueKey, newAnswerKey);
  return dispatch => createBuildCreateAnswerKeyOnUserRef(dispatch)
};

export const createAnswerKeyOnUserRefSuccess = () => ({
  type: CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS
});

export const fetchLikesAnswer = (answerKey, issueKey) => {
  const createBuildFetchLikesAnswer = buildFetchLikesAnswer(answerKey, issueKey);
  return dispatch => createBuildFetchLikesAnswer(dispatch)
};

export const fetchLikesAnswerSuccess = (answerKey, likesObj) => ({
  type: FETCH_LIKES_ANSWER_SUCCESS,
  payload: {
    answerKey,
    likesObj
  }
});


export const likeAnswer = (answerKey, issueKey) => {
  const createBuildLikeAnswer = buildLikeAnswer(answerKey, issueKey);
  return dispatch => createBuildLikeAnswer(dispatch)
};

export const likeAnswerSuccess = () => ({
  type: CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS
});



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

export function filterAnswers(filterType) {
  return {
    type: FILTER_ANSWERS,
    payload: {filterType}
  };
}

export function unloadAnswers() {
  return {
    type: UNLOAD_ANSWERS_SUCCESS
  };
}
