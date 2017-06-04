import React, {Component} from 'react';
import Subheader from 'material-ui/Subheader';
import IssueAnswerItem from './IssueAnswerItem';

const IssueAnswerList = (props) => {

  let {answers, issueId} = props;
  return (
    <div>
      {answers.length ?
        <div>
          <Subheader>Answers</Subheader>
          {answers.map((answer, index) => {
            return (
              <IssueAnswerItem key={index}
                               answer={answer}
                               issueId={issueId}/>
            )
          })}
        </div>
        : <span className="aeg-alert1">No answers available. Be the first one to answer!</span> }
    </div>
  )
}

export default IssueAnswerList