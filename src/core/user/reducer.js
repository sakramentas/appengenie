import {
  FETCH_USER_INFO_SUCCESS
} from './action-types';

export const userReducer = (state = {}, {payload, type}) => {
  switch (type) {
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        [payload.key]: {
          ...payload.userData,
        }
      };

    default:
      return state
  }
};