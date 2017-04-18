import React, {Component, PropTypes} from 'react';
import {Redirect} from 'react-router'
import IssueCreate from '../issue-create';
import AlertShort from '../../notification/alert-short';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import TransitionGroup from 'react-addons-transition-group'; //TODO: create a new component for message animations

class IssueSearch extends Component {
  // static propTypes = {
  //   createIssue: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.renderIssueCreate = ::this.renderIssueCreate;
    this.onSuggestionsFetchRequested = ::this.onSuggestionsFetchRequested;
    this.onSuggestionsClearRequested = ::this.onSuggestionsClearRequested;

    this.state = {
      value: '',
      suggestions: []
    }
  }

  onChange(event, {newValue, method}) {
    // this.props.setSearchTerm(event);
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
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  suggestCreateIssue() {
    if (this.state.value !== '' && this.state.suggestions.length <= 0) {
      return (
        <TransitionGroup>
          <AlertShort text={this.state.value} />
        </TransitionGroup>
      )
    }
  }

  // onSubmit(event) {
  //   event.preventDefault();
  //   const {title, details, answers} = this.state;
  //   if (title.length) this.props.createIssue(title, details, answers);
  //   this.clearInput();
  // }

  renderIssueCreate() {
    if (this.props.issues.size != null && this.props.issues.size <= 0) {
      return (
        <IssueCreate createIssue={this.props.createIssue}/>
      )
    }
  }

  redirectToIssuePage() {
    return (<Redirect to="/issue/"/>)
  }


  // componentWillMount() {
  //   setTimeout(() => {
  //     let issuesArray = []
  //     this.props.issues.forEach((issue, index) => issuesArray.push([issue.title, issue.key]))
  //     this.setState({issuesFiltered: issuesArray})
  //     console.log(this.state.issuesFiltered)
  //   }, 3000)
  // }
  //

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    console.log('---- val', value)
    const escapedValue = this.escapeRegexCharacters(value.trim());
    console.log('---- escaped val', escapedValue)
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
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
    );
  }


  render() {
    console.log(this.state)
    const {value, suggestions} = this.state;
    const inputProps = {
      placeholder: "Type here",
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <div className="issue-search">
          <span>I wish there was an APP to...</span>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}/>
        </div>
        {this.suggestCreateIssue()}
        {/*{this.renderIssueCreate()}*/}
      </div>
    );
  }
}

export default IssueSearch;
