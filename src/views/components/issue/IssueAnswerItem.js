import React, {Component} from 'react';
import connect from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {answersActions} from 'src/core/answers';
import Like from 'src/views/components/actions/Like'

const IssueAnswerItem = (props) => {

  let {answer} = props;
  return (
    <div className="issue-box__answerList aeg-card1">
      <CardHeader title={`${answer.appName || ''} - ${answer.body}`}
                  avatar={answer.user.image}
                  subtitle={`by ${answer.user.displayName}`}/>
      <CardActions>
        {/*<LikeButton type="answers" answerId={answer.key} issueId={issueId}  />*/}
      </CardActions>
    </div>
  )

};

const mapStateToProps = (state, ownProps) => {
  return {
    likes: get(state, `answers.list.${ownProps.answer.key}.likes`, {})
  };
};

const mapDispatchToProps = {
  ...answersActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueAnswerItem);