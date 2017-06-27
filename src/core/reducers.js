import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { issuesReducer } from './issues';
import { issueReducer } from './issue';
import { answersReducer } from './answers';
import { likesReducer } from './likes';
import { userReducer } from './user';


export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  issues: issuesReducer,
  issue: issueReducer,
  answers: answersReducer,
  // likes: likesReducer,
  user: userReducer,
});

