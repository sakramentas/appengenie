import {firebaseAuth, firebaseDb} from 'src/core/firebase';

import {
  LOAD_LIKES_ISSUE,
  LOAD_LIKES_ANSWER,
  LOAD_LIKES_ANSWER_SUCCESS,
  LIKE_ISSUE,
  LIKE_ANSWER,
  CREATE_LIKES_ANSWER_SUCCESS,
  UPDATE_LIKES_ANSWER_SUCCESS,
  DELETE_LIKES_ANSWER_SUCCESS
} from './action-types';

import {FirebaseList} from 'src/core/firebase';


// export const loadLikesAnswer = (issueId, answerId) => {
//   return dispatch => {
//     let currentUserUid = firebaseAuth.currentUser.uid;
//     firebaseDb.ref(`answers/${issueId}/${answerId}/likes`).once('value', snapshot => {
//       let listOfLikes = snapshot.val();
//       // console.log('USEEEERR!!', likedbyUser[this.props.answer.key])
//       if (listOfLikes[currentUserUid]) {
//         dispatch()
//       }
//     })
//   }
// }


// export const LikesModel =
//   ({
//     key = false,
//   }) => {
//     return {
//       key
//     }
//   };

export function loadLikesAnswer(issueId, answerId) {
  // return (dispatch) => {
  // let currentUserUid = firebaseAuth.currentUser.uid;
  // console.log('getstate', getState());
  // console.log(`KARINEEE answers/${issueId}/${answerId}/likes`, likesList)
  // likesList.path = `answers/${issueId}/${answerId}/likes`;
  // likesList.subscribe(dispatch);
  // };
  return (dispatch) => {
    firebaseDb.ref(`answers/${issueId}/${answerId}`).child('likes').once('value', snapshot => {
      let listOfLikes = snapshot.val();
      console.log('getstate', listOfLikes);
      if (listOfLikes) {
        dispatch(loadLikesAnswerSuccess(listOfLikes));
      }
    })
  }
}

export const likeAnswer = (answerId, issueId) => {
  let currentUserUid = firebaseAuth.currentUser.uid;
  // firebaseDb.ref(`users/${currentUserUid}/likes`).once('value', (snapshot) => {console.log('THE SNAPSHOT ', snapshot.val())})
  // Store userID on answers
  firebaseDb.ref(`answers/${issueId}/${answerId}`).child('likes').update({[currentUserUid]: true});
  // Store answerID on user
  firebaseDb.ref(`users/${currentUserUid}`).child('likes').child('onAnswer').update({[answerId]: true})
    .catch(error => console.log(error));
};

// export const checkIfUserLiked = (answerId) => {
//   let currentUserUid = firebaseAuth.currentUser.uid;
//   let isLiked = false;
//   firebaseDb.ref(`users/${currentUserUid}/likes`).once('value', snapshot => {
//     // console.log('THE SNAPSHOT ', snapshot.val())
//     if (snapshot[answerId]) {
//       isLiked = true;
//     }
//   })
//   return isLiked
// };

export function loadLikesAnswerSuccess(likes) {
  // console.log('loadLikesAnswerSuccess', likes)
  return {
    type: LOAD_LIKES_ANSWER_SUCCESS,
    payload: likes
  };
}

// export function createlikesAnswerSuccess(likes) {
//   console.log('createlikesAnswerSuccess', likes)
//   return {
//     type: CREATE_LIKES_ANSWER_SUCCESS,
//     payload: likes
//   };
// }
//
// export function updatelikesAnswerSuccess(likes) {
//   console.log('updatelikesAnswerSuccess', likes)
//   return {
//     type: UPDATE_LIKES_ANSWER_SUCCESS,
//     payload: likes
//   };
// }
//
// export function deletelikesAnswerSuccess(likes) {
//   console.log('deletelikesAnswerSuccess ', likes)
//   return {
//     type: DELETE_LIKES_ANSWER_SUCCESS,
//     payload: likes
//   };
// }


// export const likesList = new FirebaseList({
//   onAdd: createlikesAnswerSuccess,
//   onChange: updatelikesAnswerSuccess,
//   onLoad: loadLikesAnswerSuccess,
//   onRemove: deletelikesAnswerSuccess
// }, LikesModel);








