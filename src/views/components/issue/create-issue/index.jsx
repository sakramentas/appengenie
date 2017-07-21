import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { firebaseAuth } from 'src/core/firebase';

class IssueCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      details: '',
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDetails = this.onChangeDetails.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ title: this.props.title });
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeDetails(event) {
    this.setState({
      details: event.target.value,
    });
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const { createIssue, closeIssueForm } = this.props;
    const { uid } = firebaseAuth.currentUser; // TODO - Create a selector
    if (title.length > 0) {
      createIssue(title, uid);
    }
    this.clearInput();
    closeIssueForm();
  }

  clearInput() {
    this.setState({ title: '' });
  }

  render() {
    const { closeIssueForm, handleOpenSnackbar } = this.props;
    return (
      <Card>
        <form
          className="issue-create"
          onSubmit={this.onSubmit}
        >
          <span>I wish there was an app to</span>
          <TextField
            autoComplete="on"
            className="issue-create__input issue-create__input--title"
            maxLength="100"
            onChange={this.onChangeTitle}
            onKeyUp={this.onKeyUp}
            hintText="Wish title"
            type="text"
            value={this.state.title}
            fullWidth
          />
          <TextField
            autoComplete="off"
            className="issue-create__input issue-create__input--details"
            maxLength="240"
            onChange={this.onChangeDetails}
            onKeyUp={this.onKeyUp}
            hintText="Wish details"
            type="text"
            value={this.state.details}
            fullWidth
          />
          <div className="issue-create__input issue-create__input--cta">
            <RaisedButton
              type="submit"
              label="Send"
              onClick={handleOpenSnackbar}
            />
            <RaisedButton
              type="submit"
              label="Cancel"
              secondary
              onClick={closeIssueForm}
            />
          </div>
        </form>
      </Card>
    );
  }
}

IssueCreate.propTypes = {
  title: PropTypes.string.isRequired,
  closeIssueForm: PropTypes.func.isRequired,
  handleOpenSnackbar: PropTypes.func.isRequired,
  createIssue: PropTypes.func.isRequired,
};

export default IssueCreate;
