import {List} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  CREATE_ISSUE_ANSWER_SUCCESS,
  LOAD_ISSUES_SUCCESS,
  UPDATE_ISSUE_SUCCESS
} from './action-types';


export const IssuesState = {
  deleted: null,
  filter: '',
  filterSelected: '',
  list: new List(),
  previous: null
};


export function issuesReducer(state = IssuesState, {payload, type}) {
  switch (type) {
    case CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
          state.previous :
          state.list.unshift(payload)
      };
    case DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        deleted: payload,
        previous: state.list,
        list: state.list.filter(issue => issue.key !== payload.key)
      };
    case CREATE_ISSUE_ANSWER_SUCCESS:
      console.log('payload answers ', payload)
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(issue => {
          return issue.key === payload.key ? {...state, payload} : issue;
        }),
      });

    case FILTER_ISSUES:
      return {
        ...state,
        filter: payload.filterType || ''
      };

    case LOAD_ISSUES_SUCCESS:
      return {
        ...state,
        list: new List(payload.reverse())
      };

    case UPDATE_ISSUE_SUCCESS:
      return {
        ...state,
        deleted: null,
        previous: null,
        list: state.list.map(issue => {
          return issue.key === payload.key ? payload : issue;
        })
      };

    case SIGN_OUT_SUCCESS:
      return IssuesState;

    default:
      return state;
  }
}
