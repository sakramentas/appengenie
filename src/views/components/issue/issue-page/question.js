import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export const IssueQuestion = ({issue}) => {

  return (
    <Card className="issue-page_question--card">
      <div className="issue-page_question">
        <div className="issue-page_question__bodyText">
          <h2><span className="issue-page_question__wish--text">I wish there was an App to</span> {issue.body}</h2>
        </div>
        <div className="issue-page_question__bottom">
          <div className="issue-page_question__avatar">
          <img src={issue.user.image} alt="avatar"/>
          </div>
          <div className="issue-page_question__userName">
            <span>{issue.user.displayName}</span>
          </div>
        </div>
      </div>
    </Card>
  )
};
