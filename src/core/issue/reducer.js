import {
  GET_MOST_RECOMMENDED_APP_ICON_SUCCESS,
  FETCH_ISSUE_SUCCESS
} from './action-types';

export const issueReducer = (state = {}, {payload, type}) => {
  switch (type) {
    case GET_MOST_RECOMMENDED_APP_ICON_SUCCESS:
      return {
        ...state,
        [payload.issueKey]: {
          mostRecommendedAppIcon: payload.appIcon
        }
      };

    case FETCH_ISSUE_SUCCESS:
      return {
        ...state,
        ...payload
      };
    default:
      return state
  }
};