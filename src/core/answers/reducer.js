import {List} from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  FILTER_ANSWERS,
  CREATE_ANSWER_ANSWER_SUCCESS,
  LOAD_ANSWERS_SUCCESS,
  UPDATE_ANSWER_SUCCESS
} from './action-types';


export const AnswersState = {
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
};


export function answersReducer(state = AnswersState, {payload, type}) {
  switch (type) {
    case CREATE_ANSWER_SUCCESS:
      return {
        ...state,
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
          state.previous :
          state.list.unshift(payload)
      };
    case DELETE_ANSWER_SUCCESS:
      return {
        ...state,
        deleted: payload,
        previous: state.list,
        list: state.list.filter(answer => answer.key !== payload.key)
      };
    case CREATE_ANSWER_ANSWER_SUCCESS:
      console.log('payload answers ', payload)
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(answer => {
          return answer.key === payload.key ? {...state, payload} : answer;
        }),
      });

    case FILTER_ANSWERS:
      return {
        ...state,
        filter: payload.filterType || ''
      };

    case LOAD_ANSWERS_SUCCESS:
      return {
        ...state,
        list: new List(payload.reverse())
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
