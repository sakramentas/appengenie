import firebase from 'firebase';

export const buildCreateIssueDataPayload = (body, newIssueKey) => ({
    key: newIssueKey,
    body: body,
    createdAt: firebase.database.ServerValue.TIMESTAMP
});

export const buildCreateIssueUserPayload = (userInfo) => ({
    displayName: userInfo.displayName,
    id: userInfo.uid,
    image: userInfo.photoURL
});

export const buildCreateIssueAnswerPayload = (details) => ({
    answer: details
});