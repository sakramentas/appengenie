import {
  FETCH_USER_INFO_SUCCESS
} from './action-types';
import {
  buildFetchUserInfo
} from './firebasebuild';

export const fetchUserInfo = (uid, key) => {
  console.log('fetching user info')
  let getUser = buildFetchUserInfo(uid);
  return dispatch => getUser(dispatch, key)
};

export const fetchUserInfoSuccess = (key, uid, data) => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload: {
    key,
    uid,
    userData: data
  }
});

