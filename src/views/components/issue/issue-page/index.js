import React from 'react';
import {IssueQuestion} from './question';
import {IssueAnswerList} from '../issue-answer/answer-list';
import IssueAnswerForm from '../issue-answer/answer-form';


export const IssuePageForum = ({issue, createAnswer, answers}) => {

  return (
    <div>
      <IssueQuestion issue={issue}/>
      <IssueAnswerList answers={answers}
                       issueId={issue.key}/>
      <IssueAnswerForm createAnswer={createAnswer}
                       issueKey={issue.key}/>
    </div>
  );
};
