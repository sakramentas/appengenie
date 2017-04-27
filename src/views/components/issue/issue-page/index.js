import React from 'react';
import {IssueQuestion} from './question';
import {IssueAnswerList} from './answer-list';
import IssueAnswerForm from './answer-form';


export const IssuePageForum = ({issue, createAnswer, answers}) => {

  return (
    <div>
      <IssueQuestion issue={issue}/>
      <IssueAnswerList answers={answers}/>
      <IssueAnswerForm createAnswer={createAnswer}
                       issueKey={issue.key}/>
    </div>
  );
};
