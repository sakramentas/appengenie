import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import axios from 'axios';
import {buildFetchAppsfromApi} from '../engine/endpoints'
import {
  buildFetchAnswers,
  buildCreateAnswer,
  buildCreateAnswerKeyOnUserRef,
  buildFetchLikesAnswer,
  buildLikeAnswer,
  buildDislikeAnswer,
  buildfetchAppDataAnswer
} from './firebasebuild'
import {
  CREATE_ANSWER_ERROR,
  CREATE_ANSWER_SUCCESS,
  CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS,
  FILTER_ANSWERS,
  FETCH_LIKES_ANSWER_SUCCESS,
  FETCH_APPS_FROM_API_SUCCESS,
  FETCH_ANSWERS_SUCCESS,
  LIKE_ANSWER_SUCCESS,
  DISLIKE_ANSWER_SUCCESS,
  UNLOAD_ANSWERS_SUCCESS,
  FETCH_APP_DATA_ANSWER_SUCCESS
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
  type: LIKE_ANSWER_SUCCESS
});

export const dislikeAnswer = (answerKey, issueKey) => {
  const createBuildDislikeAnswer = buildDislikeAnswer(answerKey, issueKey);
  return dispatch => createBuildDislikeAnswer(dispatch)
};

export const dislikeAnswerSuccess = () => ({
  type: DISLIKE_ANSWER_SUCCESS
});


export const fetchAppDataAnswer = (answerKey, appName) => {
  const createBuildfetchAppDataAnswer = buildfetchAppDataAnswer(answerKey, appName);
  return dispatch => createBuildfetchAppDataAnswer(dispatch)
};

export const fetchAppDataAnswerSuccess = (answerKey, appData) => {
  return {
    type: FETCH_APP_DATA_ANSWER_SUCCESS,
    payload: {
      answerKey,
      appData
    }
  };
};

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
