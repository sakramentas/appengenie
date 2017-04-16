import React, { Component, PropTypes } from 'react';


class IssueSearch extends Component {
  // static propTypes = {
  //   createIssue: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      details: 'testing details',
      answers: ' testing answers'
    };

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
  }

  clearInput() {
    this.setState({title: ''});
  }

  onChange(event) {
    this.setState({title: event.target.value});
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {title, details, answers} = this.state;
    if (title.length) this.props.createIssue(title, details, answers);
    this.clearInput();
  }

  render() {
    let {showIssueCreateForm} = this.props;
    let {setSearchTerm} = this.props;
    return (
      <form className="issue-search" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="issue-search__input"
          maxLength="64"
          onChange={setSearchTerm}
          onKeyUp={this.onKeyUp}
          placeholder="I wish there was an app to"
          ref={c => this.titleInput = c}
          type="text"

        />
        <input type="checkbox" onChange={showIssueCreateForm} />
      </form>
    );
  }
}

export default IssueSearch;
