import axios from 'axios';
import { buildFetchAppsfromApi } from '../engine/endpoints';
import {
  buildFetchAnswers,
  buildCreateAnswer,
  buildCreateAnswerKeyOnUserRef,
  buildCreateAnswerKeyOnIssuesRef,
  buildFetchLikesAnswer,
  buildLikeAnswer,
  buildDislikeAnswer,
  buildFetchAppDataAnswer,
} from './firebasebuild';
import {
  CREATE_ANSWER_ERROR,
  CREATE_ANSWER_SUCCESS,
  CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS,
  CREATE_ANSWER_KEY_ON_ISSUES_REF_SUCCESS,
  FILTER_ANSWERS,
  FETCH_LIKES_ANSWER_SUCCESS,
  FETCH_APPS_FROM_API_SUCCESS,
  FETCH_ANSWERS_SUCCESS,
  LIKE_ANSWER_SUCCESS,
  DISLIKE_ANSWER_SUCCESS,
  UNLOAD_ANSWERS_SUCCESS,
  FETCH_APP_DATA_ANSWER_SUCCESS,
} from './action-types';


// Fetch Answers
export const fetchAnswers = (issueKey) => {
  const createBuildFetchAnswers = buildFetchAnswers(issueKey);
  return dispatch => createBuildFetchAnswers(dispatch);
};

export const fetchAnswersSuccess = (issueKey, data) => ({
  type: FETCH_ANSWERS_SUCCESS,
  payload: {
    issueKey,
    data,
  },
});


// Fetch Apps from API
export const fetchAppsFromApiSuccess = data => ({
  type: FETCH_APPS_FROM_API_SUCCESS,
  payload: data,
});

export const fetchAppsFromApi = searchTerm => dispatch => (
  axios(buildFetchAppsfromApi(searchTerm))
    .then(response => dispatch(fetchAppsFromApiSuccess(response.data)))
    .catch(err => console.log(err)) // eslint-disable-line
);


// Answer Actions
export const createAnswer = (issueKey, appName, appData, body, userInfo) => {
  const createBuildCreateAnswer = buildCreateAnswer(issueKey, appName, appData, body, userInfo);
  return dispatch => createBuildCreateAnswer(dispatch);
};

export const createAnswerSuccess = () => ({ // TODO: REINTEGRATE THE APPS COMING FROM API LATER
  type: CREATE_ANSWER_SUCCESS,
});

export const createAnswerKeyOnIssuesRef = (issueKey, newAnswerKey) => {
  const
    createBuildCreateAnswerKeyOnIssuesRef = buildCreateAnswerKeyOnIssuesRef(issueKey, newAnswerKey);
  return dispatch => createBuildCreateAnswerKeyOnIssuesRef(dispatch);
};

export const createAnswerKeyOnIssuesRefSuccess = () => ({
  type: CREATE_ANSWER_KEY_ON_ISSUES_REF_SUCCESS,
});

export const createAnswerKeyOnUserRef = (newAnswerKey, userId) => {
  const createBuildCreateAnswerKeyOnUserRef = buildCreateAnswerKeyOnUserRef(newAnswerKey, userId);
  return dispatch => createBuildCreateAnswerKeyOnUserRef(dispatch);
};

export const createAnswerKeyOnUserRefSuccess = () => ({
  type: CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS,
});

export function createAnswerError(error) {
  return {
    type: CREATE_ANSWER_ERROR,
    payload: error,
  };
}

export function filterAnswers(filterType) {
  return {
    type: FILTER_ANSWERS,
    payload: { filterType },
  };
}

export function unloadAnswers() {
  return {
    type: UNLOAD_ANSWERS_SUCCESS,
  };
}


// Like/Dislike Actions
export const fetchLikesAnswer = (answerKey, issueKey) => {
  const createBuildFetchLikesAnswer = buildFetchLikesAnswer(answerKey, issueKey);
  return dispatch => createBuildFetchLikesAnswer(dispatch);
};

export const fetchLikesAnswerSuccess = (answerKey, likesObj) => ({
  type: FETCH_LIKES_ANSWER_SUCCESS,
  payload: {
    answerKey,
    likesObj,
  },
});

export const likeAnswer = (answerKey, issueKey) => {
  const createBuildLikeAnswer = buildLikeAnswer(answerKey, issueKey);
  return dispatch => createBuildLikeAnswer(dispatch);
};

export const likeAnswerSuccess = () => ({
  type: LIKE_ANSWER_SUCCESS,
});

export const dislikeAnswer = (answerKey, issueKey) => {
  const createBuildDislikeAnswer = buildDislikeAnswer(answerKey, issueKey);
  return dispatch => createBuildDislikeAnswer(dispatch);
};

export const dislikeAnswerSuccess = () => ({
  type: DISLIKE_ANSWER_SUCCESS,
});


// App Data Actions
export const fetchAppDataAnswer = (answerKey, appName) => {
  const createBuildfetchAppDataAnswer = buildFetchAppDataAnswer(answerKey, appName);
  return dispatch => createBuildfetchAppDataAnswer(dispatch);
};

export const fetchAppDataAnswerSuccess = (answerKey, appData) => ({
  type: FETCH_APP_DATA_ANSWER_SUCCESS,
  payload: {
    answerKey,
    appData,
  },
});
