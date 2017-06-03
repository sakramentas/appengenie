import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from 'material-ui/Card';
import { firebaseAuth } from 'src/core/firebase';

class IssueCreate extends Component {

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

  componentWillMount() {
    this.setState({title: this.props.title})
  }

  clearInput() {
    this.setState({title: ''});
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  onChangeDetails(event) {
    this.setState({
      details: event.target.value
    });
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {title, details} = this.state;
    const {uid, photoURL, displayName} = firebaseAuth.currentUser;
    if (title.length) {
      this.props.createIssue(title, {uid, photoURL, displayName});
    }
    this.clearInput();
    this.props.closeIssueForm();
  }

  render() {
    let {closeIssueForm, handleOpenSnackbar} = this.props;
    return (
      <Card>
        <form className="issue-create"
              onSubmit={this.onSubmit}>
          <span>I wish there was an app to</span>
          <TextField
            autoComplete="on"
            className="issue-create__input issue-create__input--title"
            maxLength="100"
            onChange={this.onChangeTitle}
            onKeyUp={this.onKeyUp}
            hintText="Wish title"
            ref={c => this.titleInput = c}
            type="text"
            value={this.state.title}
            fullWidth={true}
          />
          <TextField
            autoComplete="off"
            className="issue-create__input issue-create__input--details"
            maxLength="240"
            onChange={this.onChangeDetails}
            onKeyUp={this.onKeyUp}
            hintText="Wish details"
            ref={c => this.detailsInput = c}
            type="text"
            value={this.state.details}
            fullWidth={true}
          />
          <div className="issue-create__input issue-create__input--cta">
            <RaisedButton type="submit"
                          label="Send"
                          primary={true}
                          onClick={handleOpenSnackbar}/>
            <RaisedButton type="submit"
                          label="Cancel"
                          secondary={true}
                          onClick={closeIssueForm}/>
          </div>
        </form>
      </Card>
    );
  }
}

export default IssueCreate;
