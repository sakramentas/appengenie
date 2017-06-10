import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {getDeletedIssue} from './selectors';
import {issueList} from './issue-list';
import {
  buildCreateIssue,
  buildCreateIssueAnswer,
  buildFetchIssues,
  buildGetMostRecommendedAppIcon
} from './firebasebuild'
import {
  CREATE_ISSUE_ERROR,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_ANSWER_ERROR,
  CREATE_ISSUE_ANSWER_SUCCESS,
  DELETE_ISSUE_ERROR,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  FETCH_ISSUES_SUCCESS,
  GET_MOST_RECOMMENDED_APP_ICON_SUCCESS,
  UNLOAD_ISSUES_SUCCESS,
  UPDATE_ISSUE_ERROR,
  UPDATE_ISSUE_SUCCESS
} from './action-types';

export const fetchIssues = () => {
  const fetchIssuesFromFirebase = buildFetchIssues();
  return dispatch => fetchIssuesFromFirebase(dispatch);
};

export const fetchIssuesSuccess = (issues) => {
  return {
    type: FETCH_ISSUES_SUCCESS,
    payload: issues
  };
};

export const fetchIssuesError = (error) => {
  return {
    type: FETCH_ISSUES_SUCCESS,
    payload: error
  };
};

export const getMostRecommendedAppIcon = issueKey => {
  const getApp = buildGetMostRecommendedAppIcon(issueKey);
  return dispatch => getApp(dispatch)
};

export const getMostRecommendedAppIconSuccess = (issueKey, appIcon) => ({
  type: GET_MOST_RECOMMENDED_APP_ICON_SUCCESS,
  payload: {
    appIcon,
    issueKey
  }
});

export const createIssue = (body, uid) => {
  buildCreateIssue(body, uid);
};

export const createIssueError = (error) => ({
  type: CREATE_ISSUE_ERROR,
  payload: error
});

export function createIssueSuccess(issue) {
  return {
    type: CREATE_ISSUE_SUCCESS,
    payload: issue
  }
}

export function createIssueAnswer(key, details, answerKey) {
  return dispatch => {
    try {
      buildCreateIssueAnswer(key, details, answerKey)
    }
    catch (err) {
      dispatch(createIssueAnswerError(err));
    }
  };
}

export function createIssueAnswerError(error) {
  return {
    type: CREATE_ISSUE_ANSWER_ERROR,
    payload: error
  };
}

export function createIssueAnswerSuccess(issueAnswer) {
  return {
    type: CREATE_ISSUE_ANSWER_SUCCESS,
    payload: issueAnswer
  };
}

export function deleteIssue(issue) {
  return dispatch => {
    issueList.remove(issue.key)
      .catch(error => dispatch(deleteIssueError(error)));
  };
}

export function deleteIssueError(error) {
  return {
    type: DELETE_ISSUE_ERROR,
    payload: error
  };
}

export function deleteIssueSuccess(issue) {
  return {
    type: DELETE_ISSUE_SUCCESS,
    payload: issue
  };
}

export function undeleteIssue() {
  return (dispatch, getState) => {
    const issue = getDeletedIssue(getState());
    if (issue) {
      issueList.set(issue.key, {completed: issue.completed, title: issue.title})
        .catch(error => dispatch(undeleteIssueError(error)));
    }
  };
}

export function undeleteIssueError(error) {
  return {
    type: UNDELETE_ISSUE_ERROR,
    payload: error
  };
}

export function updateIssueError(error) {
  return {
    type: UPDATE_ISSUE_ERROR,
    payload: error
  };
}

export function updateIssue(issue, changes) {
  return dispatch => {
    issueList.update(issue.key, changes)
      .catch(error => dispatch(updateIssueError(error)));
  };
}

export function updateIssueSuccess(issue) {
  return {
    type: UPDATE_ISSUE_SUCCESS,
    payload: issue
  };
}

export function filterIssues(filterType) {
  return {
    type: FILTER_ISSUES,
    payload: {filterType}
  };
}

export function unloadIssues() {
  issueList.unsubscribe();
  return {
    type: UNLOAD_ISSUES_SUCCESS
  };
}
