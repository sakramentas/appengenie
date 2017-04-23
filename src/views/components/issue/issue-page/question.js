import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export const IssueQuestion = ({issue}) => {
  return (
    <Card className="issue-box__question">
      <CardHeader title={issue.title}/>
      {/*<h4>{issue.title}</h4>*/}
      <span>{issue.details}</span>
      {/*<RaisedButton label="Default"/>*/}
    </Card>
  )
};