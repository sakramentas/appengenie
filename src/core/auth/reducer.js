import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from './action-types';


export const AuthState = {
  authenticated: false,
  id: null,
};


export const authReducer = (state = AuthState, action) => {
  const { payload, type } = action;
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: payload,
        id: payload ? payload.uid : null,
      };

    case SIGN_OUT_SUCCESS:
      return state;

    default:
      return state;
  }
};

export default authReducer;
