import {
  FETCH_ISSUE_SUCCESS,
  FETCH_ISSUE_APP_RANK_SUCCESS,
  UNLOAD_ISSUE_SUCCESS,
  FETCH_LIKES_QUESTION_SUCCESS,
  LIKE_QUESTION_SUCCESS,
  DISLIKE_QUESTION_SUCCESS
} from './action-types';
import {
  buildFetchIssue,
  buildFetchIssueAppRank,
  buildFetchLikesQuestion,
  buildLikeQuestion,
  buildDislikeQuestion
} from './firebasebuild';

export const fetchIssue = issueKey => {
  const getIssue = buildFetchIssue(issueKey);
  return dispatch => getIssue(dispatch)
};

export const fetchIssueSuccess = (data) => ({
  type: FETCH_ISSUE_SUCCESS,
  payload: data
});

export const fetchIssueAppRank = issueKey => {
  console.log('FETCH APP RANK', issueKey)
  const getIssueAppRank = buildFetchIssueAppRank(issueKey);
  return dispatch => getIssueAppRank(dispatch)
};

export const fetchIssueAppRankSuccess = data => ({
  type: FETCH_ISSUE_APP_RANK_SUCCESS,
  payload: data
});

export const unloadIssue = () => ({
  type: UNLOAD_ISSUE_SUCCESS
});


export const fetchLikesQuestion = (issueKey) => {
  const createBuildFetchLikesQuestion = buildFetchLikesQuestion(issueKey);
  return dispatch => createBuildFetchLikesQuestion(dispatch)
};

export const fetchLikesQuestionSuccess = (likesObj) => ({
  type: FETCH_LIKES_QUESTION_SUCCESS,
  payload: {
    likesObj
  }
});

export const likeQuestion = (issueKey) => {
  const createBuildLikeQuestion = buildLikeQuestion(issueKey);
  return dispatch => createBuildLikeQuestion(dispatch)
};

export const likeQuestionSuccess = () => ({
  type: LIKE_QUESTION_SUCCESS
});

export const dislikeQuestion = (issueKey) => {
  const createBuildDislikeQuestion = buildDislikeQuestion(issueKey);
  return dispatch => createBuildDislikeQuestion(dispatch)
};

export const dislikeQuestionSuccess = () => ({
  type: DISLIKE_QUESTION_SUCCESS
});