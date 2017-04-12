import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { notificationReducer } from './notification';
import { tasksReducer } from './tasks';
import { issuesReducer } from './issues';


export default combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer,
  issues: issuesReducer
});
