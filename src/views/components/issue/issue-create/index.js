import React, { Component, PropTypes } from 'react';


class IssueCreate extends Component {
  // static propTypes = {
  //   createIssue: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      details: ''
    };

    this.onChangeTitle = ::this.onChangeTitle;
    this.onChangeDetails = ::this.onChangeDetails;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
  }

  clearInput() {
    this.setState({title: ''});
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value
    });
    console.log(this.state.title)
  }

  onChangeDetails(event) {
    this.setState({
      details: event.target.value
    });
    console.log(this.state.details)
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {title, details} = this.state;
    if (title.length) this.props.createIssue(title, details);
    this.clearInput();
  }

  render() {
    return (
      <form className="issue-create" onSubmit={this.onSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="issue-create__input issue-create__input--title"
          maxLength="100"
          onChange={this.onChangeTitle}
          onKeyUp={this.onKeyUp}
          placeholder="Wish title"
          ref={c => this.titleInput = c}
          type="text"
          value={this.state.title}
        />
        <input
          autoComplete="off"
          className="issue-create__input issue-create__input--details"
          maxLength="240"
          onChange={this.onChangeDetails}
          onKeyUp={this.onKeyUp}
          placeholder="Wish details"
          ref={c => this.detailsInput = c}
          type="text"
          value={this.state.details}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default IssueCreate;
