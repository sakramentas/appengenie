import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import IssueQuestion from './question/index';
import IssueAppRank from './app-rank/index';
import IssueAnswerList from './answer/answer-list/index';
import IssueAnswerForm from './answer/answer-form/index';
import { issueActions } from 'src/core/issue';
import { answersActions } from 'src/core/answers';


class IssueForum extends Component {

  constructor(props) {
    super(props);

    this.handleReloadAnswers = this.handleReloadAnswers.bind(this);
  }

  componentWillMount() {
    const { fetchIssue, fetchAnswers, issueKey } = this.props;
    fetchIssue(issueKey);
    fetchAnswers(issueKey);
  }

  componentWillUnmount() {
    this.props.unloadIssue();
    this.props.unloadAnswers();
  }

  handleReloadAnswers() {
    const { fetchAnswers, issueKey } = this.props;
    fetchAnswers(issueKey);
  }

  render() {
    const { issue, issueKey, createAnswer, answers } = this.props;
    return (
      <div className="row">
        {!isEmpty(issue) ?
          <div>
            <IssueQuestion issue={issue} />
            {!isEmpty(answers) ?
              <div>
                <IssueAppRank issueKey={issueKey} />
                <IssueAnswerList
                  answers={answers}
                  issueId={issueKey}
                />
              </div>
              :
              <div className="small-12 column">
                <Message color="red">No answers available. Be the first one to answer!</Message>
              </div>
            }
            <IssueAnswerForm
              createAnswer={createAnswer}
              issueKey={issueKey}
              reloadAnswers={this.handleReloadAnswers}
            />
          </div>
          : null
        }
      </div>
    );
  }
}

IssueForum.propTypes = {
  fetchIssue: PropTypes.func.isRequired,
  fetchAnswers: PropTypes.func.isRequired,
  issueKey: PropTypes.string.isRequired,
  unloadIssue: PropTypes.func.isRequired,
  unloadAnswers: PropTypes.func.isRequired,
  createAnswer: PropTypes.func.isRequired,
  issue: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  answers: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  issue: get(state, 'issue', {}),
  answers: get(state, 'answers.list', {}),
});
const mapDispatchToProps = {
  ...issueActions,
  ...answersActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueForum);
