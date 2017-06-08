import {createSelector} from 'reselect';

export const getIssues = (state) => state.issues;
export const getIssueList = (state) => getIssues(state).list;
export const getIssueFilter = (state) => getIssues(state).filter;
export const getIssueFilterSelected = (state) => getIssues(state).filterSelected;
export const getDeletedIssue = (state) => getIssues(state).deleted;

// MEMOIZED SELECTORS
export const getVisibleIssues = createSelector(
  getIssueList,
  getIssueFilter,
  (issues, filter) => (filter.length) ? issues.filter(issue => !issue.title.indexOf(filter)) : issues
);

// const buildGetVisibleIssues = (issues, filter) => { TODO SEE IF IT WORTH REMOVING RESELECT OR NOT
//   if (filter.length) {
//     return issues.filter(issue => !issue.title.indexOf(filter));
//   }
//   else {
//     return issues
//   }
// };

// export const getVisibleIssues = (state) => buildGetVisibleIssues(getIssueList(state), getIssueFilter(state));