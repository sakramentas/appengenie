// import {List} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  FILTER_ANSWERS,
  CREATE_ANSWER_ANSWER_SUCCESS,
  LOAD_ANSWERS_SUCCESS,
  UPDATE_ANSWER_SUCCESS,
  FETCH_APPRANK_SUCCESS
} from './action-types';


export const AnswersState = {
  deleted: null,
  filter: '',
  list: {},
  previous: null,
  mostLikedApp: '',
  appIcon: ''
};


export function answersReducer(state = AnswersState, {payload, type}) {
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

    case FETCH_APPRANK_SUCCESS:
      return {
        ...state,
        mostLikedApp: payload.name,
        appIcon: payload.data ? payload.data.icon_72 : ''
      };

    case LOAD_ANSWERS_SUCCESS:
      return {
        ...state,
        list: [...payload]
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

    default:
      return state;
  }
}
