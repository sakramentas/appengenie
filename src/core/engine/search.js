import {escapeRegexCharacters} from 'src/helpers'

export const getSuggestions = (value, arr) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('\\b' + escapedValue, 'i');
  return arr
    .map(item => item)
    .filter(item => regex.test(getSuggestionValue(item)));
};

export const getSuggestionValue = (suggestion) => {
  return `${suggestion.body}`;
};