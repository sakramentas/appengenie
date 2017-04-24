import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';


export const AuthState = {
  authenticated: false,
  id: null
};


export const authReducer = (state = AuthState, action) => {
  let {payload, type} = action;
  switch (type) {
    case INIT_AUTH:
    case SIGN_IN_SUCCESS:
      let newState = {
        authenticated: payload, //true
        id: payload ? payload.uid : null
      };
      return {
        ...state,
        ...newState
      };

    case SIGN_OUT_SUCCESS:
      return AuthState;

    default:
      return state;
  }
};

