import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ANSWER_SUCCESS,
  CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS,
  FILTER_ANSWERS,
  FETCH_LIKES_ANSWER_SUCCESS,
  FETCH_APPS_FROM_API_SUCCESS,
  UNLOAD_ANSWERS_SUCCESS,
  FETCH_ANSWERS_SUCCESS
} from './action-types';


export const AnswersState = {
  filter: '',
  list: {},
  appsFromApi: {}
};


export function answersReducer(state = AnswersState, {payload, type}) {
  switch (type) {
    case CREATE_ANSWER_SUCCESS:
      return state;

    case FILTER_ANSWERS:
      return {
        ...state,
        filter: payload.filterType || ''
      };

    case FETCH_APPS_FROM_API_SUCCESS:
      return {
        ...state,
        appsFromApi: payload
      };

    case FETCH_ANSWERS_SUCCESS:
      return {
        ...state,
        list: payload.data
      };

    case FETCH_LIKES_ANSWER_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          [payload.answerKey]: {
            ...state.list[payload.answerKey],
            likesObj: payload.likesObj
          }
        }
      };

    case SIGN_OUT_SUCCESS:
      return state;

    case CREATE_ANSWER_KEY_ON_USER_REF_SUCCESS:
      return state;

    case UNLOAD_ANSWERS_SUCCESS:
      return state;

    default:
      return state;
  }
}
