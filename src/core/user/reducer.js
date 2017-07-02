import {
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_PROFILE_SUCCESS
} from './action-types';

export const userReducer = (state = {}, {payload, type}) => {
  switch (type) {
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        [payload.key]: {
          ...payload.userData,
          uid: payload.uid
        }
      };

      case FETCH_USER_INFO_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          [payload.uid]: {
            ...payload.userData,
            uid: payload.uid
          }
        }
      };

    default:
      return state
  }
};