import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export const IssueQuestion = ({issue}) => {
  return (
    <Card className="issue-box__question">
      <CardHeader title={issue.body}/>
      <CardText>{issue.user.displayName}</CardText>
    </Card>
  )
};
