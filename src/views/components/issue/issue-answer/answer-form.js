import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppSearch from '../../search/app-search'
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

  componentWillMount() {
    this.setState({body: this.props.title})
  }

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
    const {issueKey, createAnswer} = this.props;
    const {uid, photoURL, displayName} = firebaseAuth.currentUser;
    if (body.length) {
      createAnswer(issueKey, appName, appData, body, {uid, photoURL, displayName});
    }
    this.clearInput();
  }

  handleAppData(appData) {
    // firebaseDb.ref(`answers/${issueKey}`).child(newAnswerKey).update(answerData)
    this.setState({
      appData: appData,
      appName: appData.title
    })
  }

  render() {
    let {handleOpenSnackbar} = this.props;
    return (
      <div className="aeg-card1">
        <AppSearch handleAppData={this.handleAppData} />
        <form className="issue-create"
              onSubmit={this.onSubmit}>
          <span>Answer this Issue</span>
          <TextField
            autoComplete="on"
            className="issue-create__input issue-create__input--title"
            maxLength="100"
            onChange={this.onChangeAppName}
            onKeyUp={this.onKeyUp}
            hintText="App name"
            type="text"
            value={this.state.appName}
            fullWidth={false}
          />
          <TextField
            autoComplete="on"
            className="issue-create__input issue-create__input--title"
            maxLength="100"
            onChange={this.onChangeBody}
            onKeyUp={this.onKeyUp}
            hintText="Details"
            type="text"
            value={this.state.body}
            fullWidth={true}
          />
          <div className="issue-create__input issue-create__input--cta">
            <RaisedButton type="submit"
                          label="Send"
                          primary={true}
                          onClick={handleOpenSnackbar}/>
          </div>
        </form>
      </div>
    );
  }
}

export default IssueAnswerForm;
