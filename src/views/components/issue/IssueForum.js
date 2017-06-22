import React, {Component} from 'react';
import {connect} from 'react-redux';
import IssueQuestion from './IssueQuestion';
import IssueAppRank from './IssueAppRank';
import IssueAnswerList from './IssueAnswerList';
import IssueAnswerForm from './IssueAnswerForm';
import {issueActions} from 'src/core/issue';
import {answersActions} from 'src/core/answers';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {Message} from 'semantic-ui-react'

class IssueForum extends Component {

  componentWillMount() {
    const {fetchIssue, fetchAnswers, issueKey} = this.props;
    fetchIssue(issueKey);
    fetchAnswers(issueKey);
  }

  componentWillUnmount() {
    this.props.unloadIssue();
    this.props.unloadAnswers();
  }

  handleReloadAnswers() {
    const {fetchAnswers, issueKey} = this.props;
    fetchAnswers(issueKey);
  }

  render() {
    const {issue, issueKey, createAnswer, answers} = this.props;
    return (
      <div className="row">
        {!isEmpty(issue) ?
          <div>
            <IssueQuestion issue={issue}/>
            {!isEmpty(answers) ?
              <div>
                <IssueAppRank issueKey={issueKey}/>
                <IssueAnswerList answers={answers}
                                 issueId={issueKey}/>
              </div>
              :
              <div className="small-12 column">
                <Message color='red'>No answers available. Be the first one to answer!</Message>
              </div>
            }
            <IssueAnswerForm createAnswer={createAnswer}
                             issueKey={issueKey} reloadAnswers={this.handleReloadAnswers.bind(this)}/>
          </div>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    issue: get(state, 'issue', {}),
    answers: get(state, `answers.list`, {})
  };
};

const mapDispatchToProps = {
  ...issueActions,
  ...answersActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueForum);
