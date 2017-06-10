import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  CREATE_ISSUE_ANSWER_SUCCESS,
  FETCH_ISSUES_SUCCESS,
  GET_MOST_RECOMMENDED_APP_ICON_SUCCESS
} from './action-types';


export const IssuesState = {
  filter: '',
  list: {},
};


export function issuesReducer(state = IssuesState, {payload, type}) {
  switch (type) {
    case CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        list: payload
      };
    case DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(issue => issue.key !== payload.key)
      };
    case CREATE_ISSUE_ANSWER_SUCCESS:
      return state.merge({
        list: state.list.map(issue => {
          return issue.key === payload.key ? {...state, payload} : issue;
        }),
      });

    case FILTER_ISSUES:
      return {
        ...state,
        filter: payload.filterType || ''
      };

    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        list: payload
      };

    case GET_MOST_RECOMMENDED_APP_ICON_SUCCESS:
      // return state.merge({
      //   list: Object.keys(state.list).map(key => {
      //     return state.list[key] === payload.issueKey ? {...state, mostRecommendedAppIcon: payload.appIcon} : state.list;
      //   }),
      // });
      // let issueObj = {
      //   [payload.issueKey]: {
      //     ...state.payload.issueKey,
      //     mostRecommendedAppIcon: payload.appIcon
      //   }
      // };

      if (payload.issueKey) {
        return {
          ...state,
          list: {
            ...state.list,
            [payload.issueKey]: {
              ...state.list[payload.issueKey],
              mostRecommendedAppIcon: payload.appIcon
            }
          }
        }
      }
      return state;

    case SIGN_OUT_SUCCESS:
      return IssuesState;

    default:
      return state;
  }
}
