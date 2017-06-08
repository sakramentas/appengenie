import {List} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  // FETCH_APP_ICON_SUCCESS,
  CREATE_ISSUE_ANSWER_SUCCESS,
  LOAD_ISSUES_SUCCESS
} from './action-types';


export const IssuesState = {
  deleted: null,
  filter: '',
  filterSelected: '',
  list: [],
  previous: null
};


export function issuesReducer(state = IssuesState, {payload, type}) {
  switch (type) {
    case CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        deleted: null,
        previous: null,
        list: [...payload]
      };
    case DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        deleted: payload,
        previous: state.list,
        list: state.list.filter(issue => issue.key !== payload.key)
      };
    case CREATE_ISSUE_ANSWER_SUCCESS:
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

    // case FETCH_APP_ICON_SUCCESS:
    //   return {
    //     ...state,
    //     appIcon72: payload || ''
    //   };

    case LOAD_ISSUES_SUCCESS:
      const issueObject = {};
      payload.forEach(obj => {
        issueObject[obj.key] = obj;
      });
      return {
        ...state,
        list: issueObject
      };

    case SIGN_OUT_SUCCESS:
      return IssuesState;

    default:
      return state;
  }
}
