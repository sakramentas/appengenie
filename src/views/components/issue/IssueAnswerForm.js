import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppSearch from './IssueAnswerAppSearch'
import { Form, TextArea, Button } from 'semantic-ui-react'
import { firebaseAuth, firebaseDb } from 'src/core/firebase';

class IssueAnswerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appData: '',
      appName: '',
      body: ''
    };

    this.onChangeBody = ::this.onChangeBody;
    this.onChangeAppName = ::this.onChangeAppName;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
    this.handleAppData = ::this.handleAppData;
  }

  // componentWillMount() {
  //   this.setState({body: this.props.title})
  // }

  clearInput() {
    this.setState({body: '', appName: ''});
  }

  onChangeBody(event) {
    this.setState({
      body: event.target.value
    });
  }

  onChangeAppName(event) {
    this.setState({
      appName: event.target.value
    });
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {body, appName, appData} = this.state;
    const {issueKey, createAnswer, reloadAnswers} = this.props;
    const {uid, photoURL, displayName} = firebaseAuth.currentUser;
    if (body.length) {
      createAnswer(issueKey, appName, appData, body, {uid, photoURL, displayName});
      reloadAnswers();
    }
    this.clearInput();
  }

  handleAppData(appData) {
    console.log(appData)
    this.setState({
      appData: appData,
      appName: appData.title
    })
  }

  render() {
    let {handleOpenSnackbar} = this.props;
    return (
      <div className="aeg-card1">
          <span className="subheader aeg-p-color">Answer this Issue</span>
          <AppSearch handleAppData={this.handleAppData} />
          <TextArea
            placeholder="Would you like to give more details?"
            onChange={this.onChangeBody}
            onKeyUp={this.onKeyUp}
            value={this.state.body}
          />
          <div className="issue-create__cta aeg-m-top">
            <Button onClick={this.onSubmit} primary>Send</Button>
          </div>
      </div>
    );
  }
}

export default IssueAnswerForm;
