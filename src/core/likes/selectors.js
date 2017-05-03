import {createSelector} from 'reselect';

export function getLikes(state) {
  return state;
}

export function getLikesValue(state) {
  return getLikes(state).likes;
}

//
// export function getIssueList(state) {
//   return getIssues(state).list;
// }
//
// export function getIssueFilter(state) {
//   return getIssues(state).filter;
// }
//
// export function getIssueFilterSelected(state) {
//   return getIssues(state).filterSelected;
// }
//
// export function getDeletedIssue(state) {
//   return getIssues(state).deleted;
// }


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------
//TODO: create different types of filter, such as selected issue and by keyword
export const getVisibleLikes = createSelector(
  getLikes,
  (likes) => {
   return likes
  }
);
//
// export const getVisibleIssueSelected = createSelector(
//   getIssueList,
//   getIssueFilterSelected,
//   (issues, filter) => {
//     if (filter) {
//       return issues.filter(issue => !issue.key.indexOf(filter));
//     }
//     else {
//       return issues;
//     }
//   }
// );

