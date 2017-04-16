import { Record } from 'immutable';

// Model class
export const Issue = new Record({
  completed: false,
  key: null,
  title: null,
  details: null,
});
