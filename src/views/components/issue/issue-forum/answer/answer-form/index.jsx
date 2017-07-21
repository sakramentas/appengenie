import React, { Component } from 'react';
import { TextArea, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { firebaseAuth } from 'src/core/firebase';
import IssueAnswerAppSearch from '../app-search/index';

class IssueAnswerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appData: '',
      appName: '',
      body: '',
    };

    this.onChangeBody = this.onChangeBody.bind(this);
    this.onChangeAppName = this.onChangeAppName.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAppData = this.handleAppData.bind(this);
  }

  onChangeBody(event) {
    this.setState({
      body: event.target.value,
    });
  }

  onChangeAppName(event) {
    this.setState({
      appName: event.target.value,
    });
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { body, appName, appData } = this.state;
    const { issueKey, createAnswer, reloadAnswers } = this.props;
    const { uid, photoURL, displayName } = firebaseAuth.currentUser; // TODO - Create a selector
    if (body.length > 0) {
      createAnswer(issueKey, appName, appData, body, { uid, photoURL, displayName });
      reloadAnswers();
    }
    this.clearInput();
  }

  clearInput() {
    this.setState({
      body: '',
      appName: '',
    });
  }

  handleAppData(appData) {
    this.setState({
      appData,
      appName: appData.title,
    });
  }

  render() {
    return (
      <div className="aeg-card1">
        <span className="subheader aeg-p-color">Answer this Issue</span>
        <IssueAnswerAppSearch handleAppData={this.handleAppData} />
        <TextArea
          placeholder="Would you like to give more details?"
          onChange={this.onChangeBody}
          onKeyUp={this.onKeyUp}
          value={this.state.body}
        />
        <div className="issue-create__cta aeg-m-top">
          <Button
            onClick={this.onSubmit}
            primary
          >Send</Button>
        </div>
      </div>
    );
  }
}

IssueAnswerForm.propTypes = {
  issueKey: PropTypes.string.isRequired,
  createAnswer: PropTypes.func.isRequired,
  reloadAnswers: PropTypes.func.isRequired,
};

export default IssueAnswerForm;
