import {escapeRegexCharacters} from 'src/helpers'
import toArray from 'lodash/toArray'

export const getSuggestions = (value, obj) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('\\b' + escapedValue, 'i');
  return toArray(obj)
    .map(item => item)
    .filter(item => regex.test(getSuggestionValue(item)));
};

export const getSuggestionValue = (suggestion) => {
  return `${suggestion.body}`;
};