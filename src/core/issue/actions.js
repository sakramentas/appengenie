import {
  FETCH_ISSUE_SUCCESS,
  FETCH_ISSUE_APP_RANK_SUCCESS,
  UNLOAD_ISSUE_SUCCESS,
  FETCH_LIKES_QUESTION_SUCCESS,
  LIKE_QUESTION_SUCCESS,
  DISLIKE_QUESTION_SUCCESS,
  FETCH_APP_DATA_ISSUE_APP_RANK_SUCCESS,
} from './action-types';
import {
  buildFetchIssue,
  buildFetchIssueAppRank,
  buildFetchLikesQuestion,
  buildLikeQuestion,
  buildDislikeQuestion,
  buildfetchAppDataIssueAppRank,
} from './firebasebuild';


// Issue social
export const fetchIssue = (issueKey) => {
  const getIssue = buildFetchIssue(issueKey);
  return dispatch => getIssue(dispatch);
};

export const fetchIssueSuccess = data => ({
  type: FETCH_ISSUE_SUCCESS,
  payload: data,
});

export const fetchIssueAppRank = (issueKey) => {
  const getIssueAppRank = buildFetchIssueAppRank(issueKey);
  return dispatch => getIssueAppRank(dispatch);
};

export const fetchIssueAppRankSuccess = data => ({
  type: FETCH_ISSUE_APP_RANK_SUCCESS,
  payload: data,
});

export const unloadIssue = () => ({
  type: UNLOAD_ISSUE_SUCCESS,
});


// Like social
export const fetchLikesQuestion = (issueKey) => {
  const createBuildFetchLikesQuestion = buildFetchLikesQuestion(issueKey);
  return dispatch => createBuildFetchLikesQuestion(dispatch);
};

export const fetchLikesQuestionSuccess = likesObj => ({
  type: FETCH_LIKES_QUESTION_SUCCESS,
  payload: {
    likesObj,
  },
});

export const likeQuestion = (issueKey) => {
  const createBuildLikeQuestion = buildLikeQuestion(issueKey);
  return dispatch => createBuildLikeQuestion(dispatch);
};

export const likeQuestionSuccess = () => ({
  type: LIKE_QUESTION_SUCCESS,
});

export const dislikeQuestion = (issueKey) => {
  const createBuildDislikeQuestion = buildDislikeQuestion(issueKey);
  return dispatch => createBuildDislikeQuestion(dispatch);
};

export const dislikeQuestionSuccess = () => ({
  type: DISLIKE_QUESTION_SUCCESS,
});

// App data social
export const fetchAppDataIssueAppRank = (issueKey, appName) => {
  const createBuildFetchAppDataIssueAppRank = buildfetchAppDataIssueAppRank(issueKey, appName);
  return dispatch => createBuildFetchAppDataIssueAppRank(dispatch);
};

export const fetchAppDataIssueAppRankSuccess = appData => ({
  type: FETCH_APP_DATA_ISSUE_APP_RANK_SUCCESS,
  payload: {
    appData,
  },
});
