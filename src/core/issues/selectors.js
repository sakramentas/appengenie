import { createSelector } from 'reselect';


export function getIssues(state) {
  return state.issues;
}

export function getIssueList(state) {
  return getIssues(state).list;
}

export function getIssueFilter(state) {
  return getIssues(state).filter;
}

export function getDeletedIssue(state) {
  return getIssues(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleIssues = createSelector(
  getIssueList,
  getIssueFilter,
  (issues, filter) => {
    switch (filter) {
      case 'active':
        return issues.filter(issue => !issue.completed);

      case 'completed':
        return issues.filter(issue => issue.completed);

      default:
        return issues;
    }
  }
);
