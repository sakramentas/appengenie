import {firebaseAuth, firebaseDb} from 'src/core/firebase';

import {
  LOAD_LIKES_ISSUE,
  LOAD_LIKES_ANSWER,
  LOAD_LIKES_ANSWER_SUCCESS,
  LIKE_ISSUE,
  LIKE_ANSWER,
  CREATE_LIKES_ANSWER_SUCCESS
} from './action-types';


export const likesState = {
  likes: {},
  isLiked: false
};


export function likesReducer(state = {}, {payload, type}) {
  switch (type) {

    case LOAD_LIKES_ANSWER_SUCCESS:
      let currentUserUid = firebaseAuth.currentUser.uid;
      // console.log('CHECKING UID AND LIKED UID ==== ', currentUserUid, Object.keys(payload))
      if (currentUserUid == Object.keys(payload)) {
        return {
          ...state,
          ...payload,
          isLiked: true
        }
      } else {
        return {
          ...state,
          ...payload,
          isLiked: false
        }
      }

    // case CREATE_LIKES_ANSWER_SUCCESS:
    //   console.log('CREATE_LIKES_ANSWER_SUCCESS!!')
    //   return {
    //     ...state,
    //     likes: payload
    //   };

    default:
      return state;
  }
}