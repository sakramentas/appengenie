import React, {Component, PropTypes} from 'react';

import IssueCreate from '../issue-create';

class IssueSearch extends Component {
  // static propTypes = {
  //   createIssue: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
    this.renderIssueCreate = ::this.renderIssueCreate;
  }

  onChange(event) {
    this.props.setSearchTerm(event);
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

  renderIssueCreate() {
    if (this.props.issues.size != null && this.props.issues.size <= 0) {
      return (
        <IssueCreate createIssue={this.props.createIssue}/>
      )
    }
  }


  render() {

    return (
      <div>
        <form className="issue-search" onSubmit={this.onSubmit} noValidate>
          <input
            autoComplete="off"
            autoFocus
            className="issue-search__input"
            maxLength="64"
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
            placeholder="I wish there was an app to"
            ref={c => this.titleInput = c}
            type="text"

          />
        </form>
        {this.renderIssueCreate()}
      </div>
    );
  }
}

export default IssueSearch;
