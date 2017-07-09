import toArray from 'lodash/toArray';
import { escapeRegexCharacters } from '../../helpers';

export const getSuggestionValue = suggestion => `${suggestion.body}`;

// Build suggestions for the Search input 'I wish there was an app to...'
export const getSuggestions = (value, obj) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp(`\\b${escapedValue}`, 'i');
  return toArray(obj)
    .map(item => item)
    .filter(item => regex.test(getSuggestionValue(item)));
};
