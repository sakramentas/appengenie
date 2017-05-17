import React from 'react';
import {IssueQuestion} from './question';
import {IssueAnswerList} from '../issue-answer/answer-list';
import IssueAnswerForm from '../issue-answer/answer-form';


export const IssuePageForum = ({issue, createAnswer, answers}) => {
console.log('ANSWERS SIZE', answers.length)
  return (
    <div className="g-row">
      <IssueQuestion issue={issue}/>
      {answers.length > 0 &&
        <IssueAnswerList answers={answers}
                        issueId={issue.key}/>
      }
      <IssueAnswerForm createAnswer={createAnswer}
                       issueKey={issue.key}/>
    </div>
  );
};
