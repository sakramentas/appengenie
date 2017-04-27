import firebase from 'firebase';
import {firebaseAuth, firebaseDb} from 'src/core/firebase';

import { getDeletedAnswer } from './selectors';
import { answerList } from './answer-list';
import {
  CREATE_ANSWER_ERROR,
  CREATE_ANSWER_SUCCESS,
  CREATE_ANSWER_ANSWER_ERROR,
  CREATE_ANSWER_ANSWER_SUCCESS,
  DELETE_ANSWER_ERROR,
  DELETE_ANSWER_SUCCESS,
  FILTER_ANSWERS,
  LOAD_ANSWERS_SUCCESS,
  LOAD_ANSWERS_ANSWER_SUCCESS,
  UNDELETE_ANSWER_ERROR,
  UNLOAD_ANSWERS_SUCCESS,
  UNLOAD_ANSWERS_ANSWER_SUCCESS,
  UPDATE_ANSWER_ERROR,
  UPDATE_ANSWER_SUCCESS
} from './action-types';


export function createAnswer(issueKey, body, userInfo) {
  return dispatch => {
    var newAnswerKey = firebaseDb.ref().child('answers').push().key;
    let answerData = {
      key: newAnswerKey,
      body: body,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    let answerDataUser = {
      displayName: userInfo.displayName,
      id: userInfo.uid,
      image: userInfo.photoURL
    };
    console.log('CHECK IF HAS KEY --- ', issueKey)
    firebaseDb.ref(`answers/${issueKey}`).child(newAnswerKey).update(answerData)
    firebaseDb.ref(`answers/${issueKey}`).child(newAnswerKey).child('user').update(answerDataUser)
    firebaseDb.ref(`issues/${issueKey}`).child('answers').update({[newAnswerKey]: true})
    // answerList.push({body: title})
      .catch(error => dispatch(createAnswerError(error)));
  };
}

export function createAnswerError(error) {
  return {
    type: CREATE_ANSWER_ERROR,
    payload: error
  };
}

export function createAnswerSuccess(answer) {
  return {
    type: CREATE_ANSWER_SUCCESS,
    payload: answer
  };
}

export function createAnswerAnswerError(error) {
  return {
    type: CREATE_ANSWER_ANSWER_ERROR,
    payload: error
  };
}

export function createAnswerAnswerSuccess(answer) {
  return {
    type: CREATE_ANSWER_ANSWER_SUCCESS,
    payload: answer
  };
}

export function deleteAnswer(answer) {
  return dispatch => {
    answerList.remove(answer.key)
      .catch(error => dispatch(deleteAnswerError(error)));
  };
}

export function deleteAnswerError(error) {
  return {
    type: DELETE_ANSWER_ERROR,
    payload: error
  };
}

export function deleteAnswerSuccess(answer) {
  return {
    type: DELETE_ANSWER_SUCCESS,
    payload: answer
  };
}

export function undeleteAnswer() {
  return (dispatch, getState) => {
    const answer = getDeletedAnswer(getState());
    if (answer) {
      answerList.set(answer.key, {completed: answer.completed, title: answer.title})
        .catch(error => dispatch(undeleteAnswerError(error)));
    }
  };
}

export function undeleteAnswerError(error) {
  return {
    type: UNDELETE_ANSWER_ERROR,
    payload: error
  };
}

export function updateAnswerError(error) {
  return {
    type: UPDATE_ANSWER_ERROR,
    payload: error
  };
}

export function updateAnswer(answer, changes) {
  return dispatch => {
    answerList.update(answer.key, changes)
      .catch(error => dispatch(updateAnswerError(error)));
  };
}

export function updateAnswerSuccess(answer) {
  return {
    type: UPDATE_ANSWER_SUCCESS,
    payload: answer
  };
}

export function loadAnswersSuccess(answers) {
  console.log('answer success ', answers)
  return {
    type: LOAD_ANSWERS_SUCCESS,
    payload: answers
  };
}

export function filterAnswers(filterType) {
  return {
    type: FILTER_ANSWERS,
    payload: {filterType}
  };
}

export function loadAnswers(issueId) {
  return (dispatch, getState) => {
    answerList.path = `answers/${issueId}`;
    answerList.subscribe(dispatch);
  };
}


export function unloadAnswers() {
  answerList.unsubscribe();
  return {
    type: UNLOAD_ANSWERS_SUCCESS
  };
}
