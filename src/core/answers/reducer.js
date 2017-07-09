import {
  SIGN_OUT_SUCCESS,
} from '../auth';

import {
  CREATE_ANSWER_SUCCESS,
  CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS,
  CREATE_ANSWER_KEY_ON_ISSUES_REF_SUCCESS,
  FILTER_ANSWERS,
  FETCH_LIKES_ANSWER_SUCCESS,
  FETCH_APPS_FROM_API_SUCCESS,
  LIKE_ANSWER_SUCCESS,
  DISLIKE_ANSWER_SUCCESS,
  UNLOAD_ANSWERS_SUCCESS,
  FETCH_ANSWERS_SUCCESS,
  FETCH_APP_DATA_ANSWER_SUCCESS,
} from './action-types';

// Answers reducer
export const answersReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case CREATE_ANSWER_SUCCESS:
      return state;

    case FILTER_ANSWERS:
      return {
        ...state,
        filter: payload.filterType || '',
      };

    case FETCH_APPS_FROM_API_SUCCESS:
      return {
        ...state,
        appsFromApi: payload,
      };

    case FETCH_ANSWERS_SUCCESS:
      return {
        ...state,
        list: payload.data,
      };

    case LIKE_ANSWER_SUCCESS:
      return state;

    case DISLIKE_ANSWER_SUCCESS:
      return state;

    case FETCH_LIKES_ANSWER_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          [payload.answerKey]: {
            ...state.list[payload.answerKey],
            likesObj: payload.likesObj,
          },
        },
      };

    case FETCH_APP_DATA_ANSWER_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          [payload.answerKey]: {
            ...state.list[payload.answerKey],
            appData2: payload.appData,
          },
        },
      };

    case SIGN_OUT_SUCCESS:
      return state;

    case CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS:
      return state;

    case CREATE_ANSWER_KEY_ON_ISSUES_REF_SUCCESS:
      return state;

    case UNLOAD_ANSWERS_SUCCESS:
      return {};

    default:
      return state;
  }
};

export default answersReducer;
