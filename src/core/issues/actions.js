import { getDeletedIssue } from './selectors';
import { issueList } from './issue-list';
import {
  CREATE_ISSUE_ERROR,
  CREATE_ISSUE_SUCCESS,
  SELECT_ISSUE,
  SELECT_ISSUE_ERROR,
  SELECT_ISSUE_SUCCESS,
  DELETE_ISSUE_ERROR,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  LOAD_ISSUES_SUCCESS,
  UNDELETE_ISSUE_ERROR,
  UNLOAD_ISSUES_SUCCESS,
  UPDATE_ISSUE_ERROR,
  UPDATE_ISSUE_SUCCESS
} from './action-types';


export function createIssue(title, details) {
  return dispatch => {
    issueList.push({completed: false, title, details})
      .catch(error => dispatch(createIssueError(error)));
  };
}

export function createIssueError(error) {
  return {
    type: CREATE_ISSUE_ERROR,
    payload: error
  };
}

export function createIssueSuccess(issue) {
  return {
    type: CREATE_ISSUE_SUCCESS,
    payload: issue
  };
}
export function selectIssue(issue) {
  return (dispatch, getState) => {
    const { auth } = getState();
    console.log('getstate', getState())
    issueList.path = `issues/${auth.id}/${issue.key}`;
    issueList.subscribe(dispatch);
  };
}

export function selectIssueError(error) {
  return {
    type: SELECT_ISSUE_ERROR,
    payload: error
  };
}

export function selectIssueSuccess(issue) {
  return {
    type: SELECT_ISSUE_SUCCESS,
    payload: issue
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

export function loadIssuesSuccess(issues) {
  return {
    type: LOAD_ISSUES_SUCCESS,
    payload: issues
  };
}

export function filterIssues(filterType) {
  return {
    type: FILTER_ISSUES,
    payload: {filterType}
  };
}

export function loadIssues() {
  return (dispatch, getState) => {
    const { auth } = getState();
    console.log('getstate', getState());
    issueList.path = `issues/${auth.id}`;
    issueList.subscribe(dispatch);
  };
}


export function unloadIssues() {
  issueList.unsubscribe();
  return {
    type: UNLOAD_ISSUES_SUCCESS
  };
}
