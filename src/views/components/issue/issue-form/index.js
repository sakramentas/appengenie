import React, { Component, PropTypes } from 'react';


class IssueForm extends Component {
  static propTypes = {
    createIssue: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

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
    return (
      <form className="issue-form" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="issue-form__input"
          maxLength="64"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="I wish there was an app to"
          ref={c => this.titleInput = c}
          type="text"
          value={this.state.title}
        />
      </form>
    );
  }
}

export default IssueForm;
