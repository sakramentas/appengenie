import firebase from 'firebase';

export const buildCreateAnswerDataPayload = (newAnswerKey, appName, body) => ({
  key: newAnswerKey,
  appName,
  body,
  createdAt: firebase.database.ServerValue.TIMESTAMP,
});

export const buildCreateAnswerUserPayload = (userInfo) => ({
  displayName: userInfo.displayName,
  id: userInfo.uid,
  image: userInfo.photoURL
});
