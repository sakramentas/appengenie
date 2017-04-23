import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import IssueCreate from '../issue-create';
import AlertShort from '../../notification/alert-short';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import {escapeRegexCharacters} from '../../../../helpers'
import Snackbar from 'material-ui/Snackbar';

import TransitionGroup from 'react-addons-transition-group'; //TODO: create a new component for message animations

class IssueSearch extends Component {

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSuggestionsFetchRequested = ::this.onSuggestionsFetchRequested;
    this.onSuggestionsClearRequested = ::this.onSuggestionsClearRequested;
    this.onSuggestionSelected = ::this.onSuggestionSelected;
    this.openIssueForm = ::this.openIssueForm;
    this.renderIssueForm = ::this.renderIssueForm;
    this.closeIssueForm = ::this.closeIssueForm;
    this.handleOpenSnackbar = ::this.handleOpenSnackbar;
    this.handleRequestClose = ::this.handleRequestClose;

    this.state = {
      value: '',
      suggestions: [],
      issueFormOpened: 'false',
      showAlert: true,
      showSearchInput: true,
      openSnackbar: false
    }
  }

  onChange(event, {newValue}) {
    this.setState({
      value: newValue,
      suggestions: this.state.suggestions === [] ? 'Create a new issue' : this.state.suggestions
    });
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onKeyUp(event) {
    // Clear on esc
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  suggestCreateIssue() {
    if (this.state.value !== '' && this.state.suggestions.length <= 0 && this.state.showAlert) {
      return (
        <AlertShort text={this.state.value}
                    openIssueForm={this.openIssueForm}/>
      )
    }
  }

  openIssueForm() {
    return this.setState({
      issueFormOpened: true,
      showAlert: false,
      showSearchInput: false
    })
  }

  closeIssueForm() {
    return this.setState({
      issueFormOpened: false,
      showAlert: true,
      showSearchInput: true
    })
  }

  renderIssueForm() {
    if (this.state.issueFormOpened === true) {
      return (
        <IssueCreate createIssue={this.props.createIssue}
                     closeIssueForm={this.closeIssueForm}
                     handleOpenSnackbar={this.handleOpenSnackbar}
                     title={this.state.value}/>
      )
    }
  }

  handleOpenSnackbar() {
    this.setState({
      openSnackbar: true
    })
  }

  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('\\b' + escapedValue, 'i');

    return [...this.props.issues]
      .map(issue => issue)
      .filter(issue => regex.test(this.getSuggestionValue(issue)));
  }

  getSuggestionValue(suggestion) {
    return `${suggestion.title}`;
  }

  renderSuggestion(suggestion, {query}) {
    const suggestionText = `${suggestion.title}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={'suggestion-content ' + suggestion.title}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className}
                    key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
    );
  }

  onSuggestionSelected(event, {suggestion}) {
    return browserHistory.push(`/issues/page?id=${suggestion.key}`)
  }

  handleRequestClose() {
    return this.setState({
      openSnackbar: false
    })
  }

  render() {
    const {value, suggestions, showSearchInput, openSnackbar} = this.state;
    var inputProps = {
      placeholder: "Type here",
      value: value,
      onChange: this.onChange
    };
    return (
      <div>
        {showSearchInput ?
          <div className="issue-search">
            <span>I wish there was an app to...</span>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              ref="searchInput"/>
          </div>
          : ''
        }
        {this.suggestCreateIssue()}
        {this.renderIssueForm()}
        <Snackbar open={openSnackbar}
                  message={`Wish created with success`}
                  action="Open"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}/>
      </div>
    );
  }
}

export default IssueSearch;
