import {
  FETCH_ISSUE_SUCCESS,
  FETCH_ISSUE_APP_RANK_SUCCESS,
  UNLOAD_ISSUE_SUCCESS,
  LIKE_QUESTION_SUCCESS,
  DISLIKE_QUESTION_SUCCESS,
  FETCH_LIKES_QUESTION_SUCCESS,
  FETCH_APP_DATA_ISSUE_APP_RANK_SUCCESS,
} from './action-types';

export const issueReducer = (state = {}, { payload, type }) => {
  switch (type) {

    case FETCH_ISSUE_SUCCESS:
      return {
        ...state,
        ...payload,
      };

    case FETCH_ISSUE_APP_RANK_SUCCESS:
      return state;

    case FETCH_APP_DATA_ISSUE_APP_RANK_SUCCESS:
      return {
        ...state,
        mostRecommendedApp: payload.appData,
      };

    case LIKE_QUESTION_SUCCESS:
      return state;

    case DISLIKE_QUESTION_SUCCESS:
      return state;

    case FETCH_LIKES_QUESTION_SUCCESS:
      return {
        ...state,
        likes: payload.likesObj,
      };

    case UNLOAD_ISSUE_SUCCESS:
      return state;

    default:
      return state;
  }
};

export default issueReducer;
