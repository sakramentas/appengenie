import { FirebaseList } from 'src/core/firebase';
import * as issueActions from './actions';
import { Issue } from './issue';


export const issueList = new FirebaseList({
  onAdd: issueActions.createIssueSuccess,
  onChange: issueActions.updateIssueSuccess,
  onLoad: issueActions.loadIssuesSuccess,
  onRemove: issueActions.deleteIssueSuccess
}, Issue);
