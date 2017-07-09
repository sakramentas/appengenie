import firebase from 'firebase';

export const buildCreateIssueDataPayload = (body, newIssueKey, uid) => ({
  key: newIssueKey,
  body,
  createdAt: firebase.database.ServerValue.TIMESTAMP,
  userId: uid,
});

// export const buildCreateIssueUserPayload = (userInfo) => ({
//     displayName: userInfo.displayName,
//     id: userInfo.uid,
//     image: userInfo.photoURL
// });

export const buildCreateIssueAnswerPayload = details => ({
  answer: details,
});
