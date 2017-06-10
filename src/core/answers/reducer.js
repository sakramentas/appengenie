// import {List} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  FILTER_ANSWERS,
  FETCH_APPS_FROM_API_SUCCESS,
  UPDATE_ANSWER_SUCCESS,
  UNLOAD_ANSWERS_SUCCESS,
  FETCH_ANSWERS_SUCCESS
} from './action-types';


export const AnswersState = {
  deleted: null,
  filter: '',
  list: {},
  previous: null,
  mostLikedApp: '',
  appIcon: '',
  appsFromApi: {}
};


export function answersReducer(state = {}, {payload, type}) {
  switch (type) {
    case CREATE_ANSWER_SUCCESS:
      return {
        ...state,
        deleted: null,
        previous: null,
        list: {...payload}
      };
    case DELETE_ANSWER_SUCCESS:
      return {
        ...state,
        deleted: payload,
        previous: state.list,
        list: state.list.filter(answer => answer.key !== payload.key)
      };

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
        list: {...payload.data}
      };

    case UPDATE_ANSWER_SUCCESS:
      return {
        ...state,
        deleted: null,
        previous: null,
        list: state.list.map(answer => {
          return answer.key === payload.key ? payload : answer;
        })
      };

    case SIGN_OUT_SUCCESS:
      return AnswersState;

    case UNLOAD_ANSWERS_SUCCESS:
      return AnswersState;

    default:
      return state;
  }
}
