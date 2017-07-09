import { issueList } from './issue-list';
import {
  buildCreateIssue,
  buildCreateIssueAnswer,
  buildFetchIssues,
  buildGetMostRecommendedAppIcon,
  buildFetchLikesQuestion,
} from './firebasebuild';
import {
  CREATE_ISSUE_ERROR,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_ANSWER_ERROR,
  CREATE_ISSUE_ANSWER_SUCCESS,
  FILTER_ISSUES,
  FETCH_ISSUES_SUCCESS,
  GET_MOST_RECOMMENDED_APP_ICON_SUCCESS,
  UNLOAD_ISSUES_SUCCESS,
  UPDATE_ISSUE_SUCCESS,
  FETCH_LIKES_QUANTITY_QUESTION_SUCCESS,
} from './action-types';

export const fetchIssues = () => {
  const fetchIssuesFromFirebase = buildFetchIssues();
  return dispatch => fetchIssuesFromFirebase(dispatch);
};

export const fetchIssuesSuccess = issues => ({
  type: FETCH_ISSUES_SUCCESS,
  payload: issues,
});

export const fetchIssuesError = error => ({
  type: FETCH_ISSUES_SUCCESS,
  payload: error,
});

export const getMostRecommendedAppIcon = (issueKey) => {
  const getApp = buildGetMostRecommendedAppIcon(issueKey);
  return dispatch => getApp(dispatch);
};

export const getMostRecommendedAppIconSuccess = (issueKey, appIcon) => ({
  type: GET_MOST_RECOMMENDED_APP_ICON_SUCCESS,
  payload: {
    appIcon,
    issueKey,
  },
});

export const createIssue = (body, uid) => buildCreateIssue(body, uid);

export const createIssueError = error => ({
  type: CREATE_ISSUE_ERROR,
  payload: error,
});

export function createIssueSuccess(issue) {
  return {
    type: CREATE_ISSUE_SUCCESS,
    payload: issue,
  };
}

export function createIssueAnswerError(error) {
  return {
    type: CREATE_ISSUE_ANSWER_ERROR,
    payload: error,
  };
}

export function createIssueAnswer(key, details, answerKey) {
  return (dispatch) => {
    try {
      buildCreateIssueAnswer(key, details, answerKey);
    } catch (err) {
      dispatch(createIssueAnswerError(err));
    }
  };
}

export function createIssueAnswerSuccess(issueAnswer) {
  return {
    type: CREATE_ISSUE_ANSWER_SUCCESS,
    payload: issueAnswer,
  };
}

export function updateIssueSuccess(issue) {
  return {
    type: UPDATE_ISSUE_SUCCESS,
    payload: issue,
  };
}

export function filterIssues(filterType) {
  return {
    type: FILTER_ISSUES,
    payload: { filterType },
  };
}

export function unloadIssues() {
  issueList.unsubscribe();
  return {
    type: UNLOAD_ISSUES_SUCCESS,
  };
}


export const fetchLikesQuestion = (issueKey) => {
  const createBuildFetchLikesQuestion = buildFetchLikesQuestion(issueKey);
  return dispatch => createBuildFetchLikesQuestion(dispatch);
};

export const fetchLikesQuestionSuccess = (issueKey, likesObj) => ({
  type: FETCH_LIKES_QUANTITY_QUESTION_SUCCESS,
  payload: {
    issueKey,
    likesObj,
  },
});
