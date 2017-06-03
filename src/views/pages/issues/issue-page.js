import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';

import { getIssueFilter, getVisibleIssues, issuesActions } from 'src/core/issues';
import { getAnswerFilter, getVisibleAnswers, answersActions } from 'src/core/answers';
import {IssueForum} from '../../components/issue/IssueForum';


export class Issue extends Component {

  componentWillMount() {
    this.props.loadIssues();
    // Load the answers for this specific issue
    this.props.loadAnswers(this.props.location.query.id);
  }

  componentDidMount() {
    console.log('THIS.PROPS', this.props.answers);
  }

  loadSelectedIssue() {
    let {createAnswer, issues, location, answers} = this.props;
    return issues.map((issue, index) => { //TODO: get the selected issue with getVisibleIssues selector
      // console.log('Auth key', this.props.auth.id)
      if (issue.key === location.query.id) {
        return (<IssueForum issue={issue}
                                key={index}
                                createAnswer={createAnswer}
                                answers={answers}
        />)
      }
    })
  }

  render() {
    console.log('issue page', this.props.issues)
    return (
      <div className="issue-page">
        {this.loadSelectedIssue()}
      </div>
    );
  }
}




//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getIssueFilter,
  getVisibleIssues,
  getVisibleAnswers,
  (filterType, issues, answers) => ({
    filterType,
    issues,
    answers
  })
);

// const mapStateToProps = state => ({ TODO FIX IT
//   filterType: getIssueFilter,
//   issues: getVisibleIssues,
//   answers: getVisibleAnswers
// });

const mapDispatchToProps = Object.assign(
  {},
  issuesActions,
  answersActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue);
