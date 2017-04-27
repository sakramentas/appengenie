import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export const IssueQuestion = ({issue}) => {
  return (
    <Card className="issue-box__question">
      <CardHeader title={issue.body} avatar={issue.user.image} subtitle={`by ${issue.user.displayName}`}/>

    </Card>
  )
};
