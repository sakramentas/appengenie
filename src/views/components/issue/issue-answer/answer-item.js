import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


import {answersActions} from 'src/core/answers';


import LikeButton from 'src/views/components/like-button'

export class IssueAnswerItem extends Component {


  render() {
    let {answer, issueId} = this.props;
    return (
      <Card className="issue-box__answerList">
        <CardHeader title={`${answer.appName || ''} - ${answer.body}`}
                    avatar={answer.user.image}
                    subtitle={`by ${answer.user.displayName}`}/>
        <CardActions>
          <LikeButton type="answers" answerId={answer.key} issueId={issueId}  />
        </CardActions>
      </Card>
    )
  }
}


