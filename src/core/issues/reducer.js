import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  LOAD_ISSUES_SUCCESS,
  UPDATE_ISSUE_SUCCESS
} from './action-types';


export const IssuesState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function issuesReducer(state = new IssuesState(), {payload, type}) {
  switch (type) {
    case CREATE_ISSUE_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case DELETE_ISSUE_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(issue => issue.key !== payload.key)
      });

    case FILTER_ISSUES:
      return state.set('filter', payload.filterType || '');

    case LOAD_ISSUES_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_ISSUE_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(issue => {
          return issue.key === payload.key ? payload : issue;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new IssuesState();

    default:
      return state;
  }
}
