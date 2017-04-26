import {createSelector} from 'reselect';

export function getIssues(state) {
  console.log('getIssues ', state.issues)
  return state.issues;
}

export function getIssueList(state) {
  return getIssues(state).list;
}

export function getIssueFilter(state) {
  return getIssues(state).filter;
}

export function getIssueFilterSelected(state) {
  return getIssues(state).filterSelected;
}

export function getDeletedIssue(state) {
  return getIssues(state).deleted;
}


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

export const getVisibleIssueSelected = createSelector(
  getIssueList,
  getIssueFilterSelected,
  (issues, filter) => {
    if (filter) {
      return issues.filter(issue => !issue.key.indexOf(filter));
    }
    else {
      return issues;
    }
  }
);

