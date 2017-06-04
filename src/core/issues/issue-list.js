import { FirebaseList } from 'src/core/firebase';
import {
  createIssueSuccess,
  updateIssueSuccess,
  loadIssuesSuccess,
  deleteIssueSuccess
} from './actions';
import { IssueModel } from './issue-model';

export const issueList = new FirebaseList({
  onAdd: createIssueSuccess,
  onChange: updateIssueSuccess,
  onLoad: loadIssuesSuccess,
  onRemove: deleteIssueSuccess
}, IssueModel);
