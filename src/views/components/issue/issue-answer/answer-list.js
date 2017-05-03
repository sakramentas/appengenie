import React, {Component} from 'react';

import Subheader from 'material-ui/Subheader';

import {answersActions} from 'src/core/answers';
import {IssueAnswerItem} from './answer-item';

import {firebaseAuth, firebaseDb} from 'src/core/firebase';

export class IssueAnswerList extends Component {

  render() {
    let {answers, issueId} = this.props;
    return (
      <div>
        <Subheader>Answers</Subheader>
        {answers.length ?
          answers.map((answer, index) => {
            return (
              <IssueAnswerItem key={index}
                               answer={answer}
                               issueId={issueId} />
            )
          })
          : <span>No answers available</span> }
      </div>
    )
  }
}

