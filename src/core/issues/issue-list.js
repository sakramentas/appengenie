import { FirebaseList } from 'src/core/firebase';
import * as issueActions from './actions';
import { IssueModel } from './issue-model';


export const issueList = new FirebaseList({
  onAdd: issueActions.createIssueSuccess,
  onChange: issueActions.updateIssueSuccess,
  onLoad: issueActions.loadIssuesSuccess,
  onRemove: issueActions.deleteIssueSuccess
}, IssueModel);
