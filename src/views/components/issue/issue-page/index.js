import React, {Component} from 'react';
import {IssueQuestion} from './question';
import {IssueAnswerList} from './answer-list';
import IssueAnswerForm from './answer-form';

import { authActions, getAuth } from 'src/core/auth';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';


export class IssuePageForum extends Component {
  constructor(props) {
    super(props)

  }

  handleIssueAnswers(key) {
    // this.props.loadIssueAnswers(key)
  }

  // generateAnswerId() {
  //   let answersNum = Object.keys(this.props.issue.answers).length;
  //   let newId = this.props.issue.key.concat(answersNum)
  //   // console.log('newid', newId, answersNum)
  //   return newId
  // }

  render() {
    let {issue, createIssueAnswer, answerId} = this.props;
    // const { auth } = this.props.getState;
    console.log('props issue auth', this.props)
    return (
      <div>
        <IssueQuestion issue={issue}/>
        <IssueAnswerList issue={issue} />
        <IssueAnswerForm createIssueAnswer={createIssueAnswer} issueKey={issue.key}/>
      </div>
    );
  }
}



// const mapStateToProps = createSelector(
//   getAuth,
//   auth => ({auth})
// );
//
// export default connect(mapStateToProps)(IssuePageForum);
