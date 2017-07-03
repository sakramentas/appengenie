import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Grid, Image, Label, Segment } from 'semantic-ui-react'
import {answersActions} from 'src/core/answers';
import {LikeBtn} from 'src/views/components/actions/LikeBtn';
import {get, has, size} from 'lodash';

class IssueAnswerItem extends Component {

  componentWillMount() {
    const {answer, issueId, fetchLikesAnswer, fetchAppDataAnswer} = this.props;
    fetchLikesAnswer(answer.key, issueId);
    // console.log(answer.key, answer.appName)
    (answer.key && answer.appName) ? fetchAppDataAnswer(answer.key, answer.appName) : null;
  }

  handleLikeAnswer() {
    const {answer, issueId, likeAnswer, dislikeAnswer, fetchLikesAnswer, youLiked} = this.props;
    youLiked === true ? dislikeAnswer(answer.key, issueId) : likeAnswer(answer.key, issueId);
    fetchLikesAnswer(answer.key, issueId);
  }

  render() {
    let {answer, likes, youLiked, appData} = this.props;
    return (
      <div>
        <Segment padded className="issue-box__answerList aeg-card1">
          <Label attached='top'><img src={appData.icon_72} className="bg-blur-img"/><img src={appData.icon_72} className="app-icon" /> {answer.appName} </Label>
          <span>{answer.body}</span> <br/>
          <LikeBtn handleLikeAnswer={this.handleLikeAnswer.bind(this)}
                   likesQt={size(likes)}
                   youLiked={youLiked}/>
        </Segment>

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    likes: get(state, `answers.list.${ownProps.answer.key}.likesObj`, {}),
    youLiked: has(state, `answers.list.${ownProps.answer.key}.likesObj.${state.auth.id}`, false),
    appData: get(state, `answers.list.${ownProps.answer.key}.appData2`, {})
  };
};

const mapDispatchToProps = {
  ...answersActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueAnswerItem);