import moment from 'moment';

export const dateSimple = date => moment(date).format('MMMM D');
export const dateFull = date => moment(date).format('MMM Do YY');
