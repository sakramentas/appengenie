import React from 'react';
import {Card} from 'material-ui/Card';
import {dateSimple} from 'src/util/date-formatter';

export const IssueQuestion = ({issue}) => {

  return (
    <Card className="issue-page_question--card">
      <div className="issue-page_question">
        <div className="issue-page_question__bodyText">
          <h2><span className="issue-page_question__wish--text">I wish there was an App to</span> {issue.body}</h2>
        </div>
        <div className="issue-page_question__bottom">
          <h5 className="header row">Wisher</h5>
          <div className="issue-page_question__avatar">
          <img src={issue.user.image} alt="avatar"/>
          </div>
          <div className="issue-page_question__userName">
            <span>{issue.user.displayName}</span>
          </div>
          <span className="aeg-block">{dateSimple(issue.createdAt)}</span>
        </div>
      </div>
    </Card>
  )
};
