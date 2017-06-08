import {
  GET_MOST_RECOMMENDED_APP_ICON_SUCCESS,
  FETCH_ISSUE_SUCCESS
} from './action-types';
import {
  buildgetMostRecommendedAppIcon,
  buildFetchIssue
} from './firebasebuild';

export const fetchIssue = issueKey => {
  let getIssue = buildFetchIssue(issueKey);
  return dispatch => getIssue(dispatch)
};

export const fetchIssueSuccess = (data) => ({
  type: FETCH_ISSUE_SUCCESS,
  payload: data
});

export const getMostRecommendedAppIcon = issueKey => {
  let getApp = buildgetMostRecommendedAppIcon(issueKey);
  return dispatch => getApp(dispatch)
};

export const getMostRecommendedAppIconSuccess = (issueKey, appIcon) => ({
  type: GET_MOST_RECOMMENDED_APP_ICON_SUCCESS,
  payload: {
    appIcon,
    issueKey
  }
});