import {firebaseAuth, firebaseDb} from 'src/core/firebase';
import {issueList} from './issue-list';
import {
  buildCreateIssueDataPayload,
  buildCreateIssueUserPayload,
  buildCreateIssueAnswerPayload
} from './payload'





export const buildCreateIssue = ({body, userInfo}) => {
  let newIssueKey = firebaseDb.ref('issues').push().key;
  issueList.path = 'issues';
  issueList.update(newIssueKey, buildCreateIssueDataPayload(body, newIssueKey));
  issueList.update(`${newIssueKey}/user`, buildCreateIssueUserPayload(userInfo));
};

export const buildCreateIssueAnswer = (key, details, answerKey) => {
  let answerPath = `${key}/answers/${answerKey}`;
  issueList.update(answerPath, buildCreateIssueAnswerPayload(details))
};