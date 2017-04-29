import firebase from 'firebase';
import {firebaseAuth, firebaseDb} from 'src/core/firebase';

import { getDeletedIssue } from './selectors';
import { issueList } from './issue-list';
import {
  CREATE_ISSUE_ERROR,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_ANSWER_ERROR,
  CREATE_ISSUE_ANSWER_SUCCESS,
  DELETE_ISSUE_ERROR,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  LOAD_ISSUES_SUCCESS,
  LOAD_ISSUES_ANSWER_SUCCESS,
  UNDELETE_ISSUE_ERROR,
  UNLOAD_ISSUES_SUCCESS,
  UNLOAD_ISSUES_ANSWER_SUCCESS,
  UPDATE_ISSUE_ERROR,
  UPDATE_ISSUE_SUCCESS
} from './action-types';


export function createIssue(title, userInfo) {
  return dispatch => {
    var newIssueKey = firebaseDb.ref().child('issues').push().key;
    let issueData = {
      key: newIssueKey,
      body: title,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    let issueDataUser = {
      displayName: userInfo.displayName,
      id: userInfo.uid,
      image: userInfo.photoURL
    };
    firebaseDb.ref(`issues/${newIssueKey}`).update(issueData)
    firebaseDb.ref(`issues/${newIssueKey}`).child('user').update(issueDataUser)
    // issueList.push({body: title})
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

export function createIssueAnswer(key, details, answerKey) {
  return (dispatch, getState) => {
    // let issueToUpdate = issueList[key];
    console.log('issuelist', issueList)
    console.log('issuekey', key)
    const { auth } = getState();
    let answerPath = `${key}/answers/${answerKey}`;
    issueList.update(answerPath, {answer: details})
      .catch(error => dispatch(updateIssueError(error)));
    // issueList.push({key : {answers: {title, details}}})
    //   .catch(error => dispatch(createIssueAnswerError(error)));
  };
}

// export const loadIssueAnswers = (key) => {
//   return (dispatch, getState) => {
//     const { auth } = getState();
//     console.log('getstate', getState());
//     issueList.path = `issues/${auth.id}/${key}/answers/${auth.id}`;
//     issueList.subscribe(dispatch);
//   }
// };

export function createIssueAnswerError(error) {
  return {
    type: CREATE_ISSUE_ANSWER_ERROR,
    payload: error
  };
}

export function createIssueAnswerSuccess(issue) {
  return {
    type: CREATE_ISSUE_ANSWER_SUCCESS,
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
  console.log('issue success ', issues)
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
    issueList.path = `issues`;
    issueList.subscribe(dispatch);
  };
}


export function unloadIssues() {
  issueList.unsubscribe();
  return {
    type: UNLOAD_ISSUES_SUCCESS
  };
}
