import React from 'react';
import {IssueQuestion} from './IssueQuestion';
import IssueAppRank from './IssueAppRank';
import IssueAnswerList from './IssueAnswerList';
import IssueAnswerForm from './IssueAnswerForm';


export const IssueForum = ({issue, createAnswer, answers}) => {
  return (
    <div className="g-row">
      <IssueQuestion issue={issue}/>
      <IssueAppRank issue={issue}/>
      <IssueAnswerList answers={answers}
                       issueId={issue.key}/>
      <IssueAnswerForm createAnswer={createAnswer}
                       issueKey={issue.key}/>
    </div>
  );
};
