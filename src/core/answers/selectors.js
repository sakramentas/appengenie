import { createSelector } from 'reselect';

// Answer selectors
export function getAnswers(state) {
  return state.answers;
}

export function getAnswerList(state) {
  return getAnswers(state).list;
}

export function getAnswerFilter(state) {
  return getAnswers(state).filter;
}

export function getAnswerFilterSelected(state) {
  return getAnswers(state).filterSelected;
}

export function getDeletedAnswer(state) {
  return getAnswers(state).deleted;
}


//= ====================================
//  MEMOIZED SELECTORS RESELECT
//-------------------------------------
// TODO: create different types of filter, such as selected answer and by keyword
export const getVisibleAnswers = createSelector(
  getAnswerList,
  getAnswerFilter,
  (answers, filter) => {
    if (filter.length) {
      return answers.filter(answer => !answer.title.indexOf(filter));
    }

    return answers;
  },
);

export const getVisibleAnswerSelected = createSelector(
  getAnswerList,
  getAnswerFilterSelected,
  (answers, filter) => {
    if (filter) {
      return answers.filter(answer => !answer.key.indexOf(filter));
    }

    return answers;
  },
);

