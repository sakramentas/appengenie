import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Snackbar from 'material-ui/Snackbar';
import { getSuggestions, getSuggestionValue } from '../../../core/engine/search';
import IssueCreate from './IssueCreate';
import AlertShort from '../notification/alert-short';


class IssueSearch extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.openIssueForm = this.openIssueForm.bind(this);
    this.closeIssueForm = this.closeIssueForm.bind(this);
    this.handleOpenSnackbar = this.handleOpenSnackbar.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      value: '',
      suggestions: [],
      issueFormOpened: 'false',
      showAlert: true,
      showSearchInput: true,
      openSnackbar: false,
    };
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
      suggestions: this.state.suggestions === [] ? 'Create a new issue' : this.state.suggestions,
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value, this.props.issues),
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  onKeyUp(event) {
    // Clear on esc
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSuggestionSelected(event, { suggestion }) { // eslint-disable-line
    browserHistory.push(`/issues/page?id=${suggestion.key}`);
  }

  suggestCreateIssue() {
    const { value, suggestions, showAlert } = this.state;
    if (value !== '' && suggestions.length <= 0 && showAlert) {
      return (
        <AlertShort
          text={value}
          openIssueForm={this.openIssueForm}
        />
      );
    }
    return null;
  }

  handleRequestClose() {
    return this.setState({
      openSnackbar: false,
    });
  }

  openIssueForm() {
    this.setState({
      issueFormOpened: true,
      showAlert: false,
      showSearchInput: false,
    });
  }

  closeIssueForm() {
    this.setState({
      issueFormOpened: false,
      showAlert: true,
      showSearchInput: true,
    });
  }

  handleOpenSnackbar() {
    this.setState({
      openSnackbar: true,
    });
  }

  renderSuggestion(suggestion, { query }) { // eslint-disable-line
    const suggestionText = suggestion.body;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={`suggestion-content ${suggestion.body}`}>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
              return (
                <span
                  className={className}
                  key={index} // eslint-disable-line react/no-array-index-key
                >{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
  }

  render() {
    const { value, suggestions, showSearchInput, openSnackbar } = this.state;
    const inputProps = {
      value,
      placeholder: 'Type here',
      onChange: this.onChange,
    };
    return (
      <div>
        {showSearchInput ?
          <div className="issue-search row align-center align-middle">
            <h3>I <b>wish</b> there was an app to...</h3>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          : null
        }
        {this.suggestCreateIssue()}
        {this.state.issueFormOpened === true ?
          <IssueCreate
            createIssue={this.props.createIssue}
            closeIssueForm={this.closeIssueForm}
            handleOpenSnackbar={this.handleOpenSnackbar}
            title={this.state.value}
          />
          : null
        }
        <Snackbar
          open={openSnackbar}
          message={'Wish created with success'}
          action="Open"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

IssueSearch.propTypes = {
  issues: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createIssue: PropTypes.func.isRequired,
};

export default IssueSearch;
