import {createSelector} from 'reselect';

export const getIssues = (state) => state.issues;
export const getIssueList = (state) => getIssues(state).list;
export const getIssueFilter = (state) => getIssues(state).filter;
export const getIssueFilterSelected = (state) => getIssues(state).filterSelected;
export const getDeletedIssue = (state) => getIssues(state).deleted;



//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------
//TODO: create different types of filter, such as selected issue and by keyword
export const getVisibleIssues = createSelector(
  getIssueList,
  getIssueFilter,
  (issues, filter) => {
    if (filter.length) {
      return issues.filter(issue => !issue.title.indexOf(filter));
    }
    else {
      return issues
    }
  }
);
