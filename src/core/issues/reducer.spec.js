import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/core/auth';

import {
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_SUCCESS,
  FILTER_ISSUES,
  LOAD_ISSUES_SUCCESS,
  UPDATE_ISSUE_SUCCESS
} from './action-types';

import { Issue } from './issue';
import { issuesReducer, IssuesState } from './reducer';


describe('issues', () => {
  describe('issuesReducer', () => {
    let issue1;
    let issue2;

    beforeEach(() => {
      issue1 = new Issue({completed: false, key: '0', title: 'issue 1'});
      issue2 = new Issue({completed: false, key: '1', title: 'issue 2'});
    });


    describe('CREATE_ISSUE_SUCCESS', () => {
      it('should prepend new issue to list', () => {
        let state = new IssuesState({list: new List([issue1])});

        let nextState = issuesReducer(state, {
          type: CREATE_ISSUE_SUCCESS,
          payload: issue2
        });

        expect(nextState.list.get(0)).toBe(issue2);
        expect(nextState.list.get(1)).toBe(issue1);
      });
    });


    describe('DELETE_ISSUE_SUCCESS', () => {
      it('should remove issue from list', () => {
        let state = new IssuesState({list: new List([issue1, issue2])});

        let nextState = issuesReducer(state, {
          type: DELETE_ISSUE_SUCCESS,
          payload: issue2
        });

        expect(nextState.deleted).toBe(issue2);
        expect(nextState.list.size).toBe(1);
        expect(nextState.list.get(0)).toBe(issue1);
        expect(nextState.previous).toBe(state.list);
      });
    });


    describe('FILTER_ISSUES', () => {
      it('should set filter with provided value', () => {
        let state = new IssuesState();

        let nextState = issuesReducer(state, {
          type: FILTER_ISSUES,
          payload: {
            filterType: 'completed'
          }
        });

        expect(nextState.filter).toBe('completed');
      });
    });


    describe('LOAD_ISSUES_SUCCESS', () => {
      it('should set issue list', () => {
        let state = new IssuesState();

        let nextState = issuesReducer(state, {
          type: LOAD_ISSUES_SUCCESS,
          payload: [issue1, issue2]
        });

        expect(nextState.list.size).toBe(2);
      });

      it('should order issues newest first', () => {
        let state = new IssuesState();

        let nextState = issuesReducer(state, {
          type: LOAD_ISSUES_SUCCESS,
          payload: [issue1, issue2]
        });

        expect(nextState.list.get(0)).toBe(issue2);
        expect(nextState.list.get(1)).toBe(issue1);
      });
    });


    describe('UPDATE_ISSUE_SUCCESS', () => {
      it('should update issue', () => {
        let state = new IssuesState({list: new List([issue1, issue2])});
        let changedIssue = issue2.set('title', 'changed');

        let nextState = issuesReducer(state, {
          type: UPDATE_ISSUE_SUCCESS,
          payload: changedIssue
        });

        expect(nextState.list.get(0)).toBe(issue1);
        expect(nextState.list.get(1)).toBe(changedIssue);
      });
    });


    describe('SIGN_OUT_SUCCESS', () => {
      it('should reset state', () => {
        let state = new IssuesState({
          delete: issue1,
          list: new List([issue1, issue2]),
          previous: new List()
        });

        let nextState = issuesReducer(state, {
          type: SIGN_OUT_SUCCESS
        });

        expect(nextState.deleted).toBe(null);
        expect(nextState.list.size).toBe(0);
        expect(nextState.previous).toBe(null);
      });
    });
  });
});
