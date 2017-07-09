import {
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_PROFILE_SUCCESS,
} from './action-types';
import {
  buildFetchUserInfo,
  buildFetchUserInfoProfile,
} from './firebasebuild';


export const fetchUserInfo = (uid, key) => {
  const getUser = buildFetchUserInfo(uid);
  return dispatch => getUser(dispatch, key);
};

export const fetchUserInfoSuccess = (key, uid, data) => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload: {
    key,
    uid,
    userData: data,
  },
});

export const fetchUserInfoProfile = (uid) => {
  const getUserProfile = buildFetchUserInfoProfile(uid);
  return dispatch => getUserProfile(dispatch);
};

export const fetchUserInfoProfileSuccess = (uid, data) => ({
  type: FETCH_USER_INFO_PROFILE_SUCCESS,
  payload: {
    uid,
    userData: data,
  },
});

