import { Record } from 'immutable';


export const Issue = new Record({
  completed: false,
  key: null,
  title: null,
  details: null,
  user: null,
  answers: null
});
