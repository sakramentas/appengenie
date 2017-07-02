import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router'
import IssueCreate from './IssueCreate';
import AlertShort from '../notification/alert-short';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Snackbar from 'material-ui/Snackbar';
import {getSuggestions, getSuggestionValue} from 'src/core/engine/search';


class IssueSearch extends Component {
  static propTypes = {
    // issues: PropTypes.obj.isRequired,
    // createIssue: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSuggestionsFetchRequested = ::this.onSuggestionsFetchRequested;
    this.onSuggestionsClearRequested = ::this.onSuggestionsClearRequested;
    this.onSuggestionSelected = ::this.onSuggestionSelected;
    this.openIssueForm = ::this.openIssueForm;
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

  onSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: getSuggestions(value, this.props.issues)
    });
  };

  onSuggestionsClearRequested() {
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
    let {value, suggestions, showAlert} = this.state;
    if (value !== '' && suggestions.length <= 0 && showAlert) {
      return (
        <AlertShort text={value}
                    openIssueForm={this.openIssueForm}/>
      )
    }
  }

  openIssueForm() {
    this.setState({
      issueFormOpened: true,
      showAlert: false,
      showSearchInput: false
    })
  }

  closeIssueForm() {
    this.setState({
      issueFormOpened: false,
      showAlert: true,
      showSearchInput: true
    })
  }

  handleOpenSnackbar() {
    this.setState({
      openSnackbar: true
    })
  }

  renderSuggestion(suggestion, {query}) {
    const suggestionText = `${suggestion.body}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={'suggestion-content ' + suggestion.body}>
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
              ref="searchInput"/>
          </div>
          : null
        }
        {this.suggestCreateIssue()}
        {this.state.issueFormOpened === true ?
          <IssueCreate createIssue={this.props.createIssue}
                       closeIssueForm={this.closeIssueForm}
                       handleOpenSnackbar={this.handleOpenSnackbar}
                       title={this.state.value}/>
          : null
        }
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
