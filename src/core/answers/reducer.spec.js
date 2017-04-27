import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/core/auth';

import {
  CREATE_ANSWER_SUCCESS,
  DELETE_ANSWER_SUCCESS,
  FILTER_ANSWERS,
  LOAD_ANSWERS_SUCCESS,
  UPDATE_ANSWER_SUCCESS
} from './action-types';

import { Answer } from './answer';
import { answersReducer, AnswersState } from './reducer';


describe('answers', () => {
  describe('answersReducer', () => {
    let answer1;
    let answer2;

    beforeEach(() => {
      answer1 = new Answer({completed: false, key: '0', title: 'answer 1'});
      answer2 = new Answer({completed: false, key: '1', title: 'answer 2'});
    });


    describe('CREATE_ANSWER_SUCCESS', () => {
      it('should prepend new answer to list', () => {
        let state = new AnswersState({list: new List([answer1])});

        let nextState = answersReducer(state, {
          type: CREATE_ANSWER_SUCCESS,
          payload: answer2
        });

        expect(nextState.list.get(0)).toBe(answer2);
        expect(nextState.list.get(1)).toBe(answer1);
      });
    });


    describe('DELETE_ANSWER_SUCCESS', () => {
      it('should remove answer from list', () => {
        let state = new AnswersState({list: new List([answer1, answer2])});

        let nextState = answersReducer(state, {
          type: DELETE_ANSWER_SUCCESS,
          payload: answer2
        });

        expect(nextState.deleted).toBe(answer2);
        expect(nextState.list.size).toBe(1);
        expect(nextState.list.get(0)).toBe(answer1);
        expect(nextState.previous).toBe(state.list);
      });
    });


    describe('FILTER_ANSWERS', () => {
      it('should set filter with provided value', () => {
        let state = new AnswersState();

        let nextState = answersReducer(state, {
          type: FILTER_ANSWERS,
          payload: {
            filterType: 'completed'
          }
        });

        expect(nextState.filter).toBe('completed');
      });
    });


    describe('LOAD_ANSWERS_SUCCESS', () => {
      it('should set answer list', () => {
        let state = new AnswersState();

        let nextState = answersReducer(state, {
          type: LOAD_ANSWERS_SUCCESS,
          payload: [answer1, answer2]
        });

        expect(nextState.list.size).toBe(2);
      });

      it('should order answers newest first', () => {
        let state = new AnswersState();

        let nextState = answersReducer(state, {
          type: LOAD_ANSWERS_SUCCESS,
          payload: [answer1, answer2]
        });

        expect(nextState.list.get(0)).toBe(answer2);
        expect(nextState.list.get(1)).toBe(answer1);
      });
    });


    describe('UPDATE_ANSWER_SUCCESS', () => {
      it('should update answer', () => {
        let state = new AnswersState({list: new List([answer1, answer2])});
        let changedAnswer = answer2.set('title', 'changed');

        let nextState = answersReducer(state, {
          type: UPDATE_ANSWER_SUCCESS,
          payload: changedAnswer
        });

        expect(nextState.list.get(0)).toBe(answer1);
        expect(nextState.list.get(1)).toBe(changedAnswer);
      });
    });


    describe('SIGN_OUT_SUCCESS', () => {
      it('should reset state', () => {
        let state = new AnswersState({
          delete: answer1,
          list: new List([answer1, answer2]),
          previous: new List()
        });

        let nextState = answersReducer(state, {
          type: SIGN_OUT_SUCCESS
        });

        expect(nextState.deleted).toBe(null);
        expect(nextState.list.size).toBe(0);
        expect(nextState.previous).toBe(null);
      });
    });
  });
});
