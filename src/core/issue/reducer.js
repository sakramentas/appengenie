import {
  FETCH_ISSUE_SUCCESS,
  FETCH_ISSUE_APP_RANK_SUCCESS,
  UNLOAD_ISSUE_SUCCESS
} from './action-types';

export const issueReducer = (state = {}, {payload, type}) => {
  switch (type) {

    case FETCH_ISSUE_SUCCESS:
      return {
        ...state,
        ...payload
      };

    case FETCH_ISSUE_APP_RANK_SUCCESS:
      return {
        ...state,
        mostRecommendedApp: payload
      };

    case UNLOAD_ISSUE_SUCCESS:
      return state;

    default:
      return state
  }
};