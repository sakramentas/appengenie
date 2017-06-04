import { CREATE_ISSUE_SUCCESS } from 'src/core/tasks';
import { DISMISS_NOTIFICATION } from './action-types';


export const initialState = {
  display: false,
  message: ''
};


export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ISSUE_SUCCESS:
      return state = {
        display: true,
        message: 'Issue Created'
      };

    case DISMISS_NOTIFICATION:
      return state;

    default:
      return state;
  }
}
