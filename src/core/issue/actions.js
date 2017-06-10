import {
  FETCH_ISSUE_SUCCESS,
  FETCH_ISSUE_APP_RANK_SUCCESS,
  UNLOAD_ISSUE_SUCCESS
} from './action-types';
import {
  buildFetchIssue,
  buildFetchIssueAppRank
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