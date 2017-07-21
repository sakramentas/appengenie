import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Segment } from 'semantic-ui-react';
import { get, has, size } from 'lodash';
import PropTypes from 'prop-types';
import { answersActions } from 'src/core/answers';
import LikeBtn from 'src/views/components/social/like-button';

class IssueAnswerItem extends Component {

  constructor(props) {
    super(props);
    this.handleLikeAnswer = this.handleLikeAnswer.bind(this);
  }

  componentWillMount() {
    const { answer, issueId, fetchLikesAnswer, fetchAppDataAnswer } = this.props;
    fetchLikesAnswer(answer.key, issueId);
    if (answer.key && answer.appName) {
      fetchAppDataAnswer(answer.key, answer.appName);
    }
  }

  handleLikeAnswer() {
    const { answer, issueId, likeAnswer, dislikeAnswer, fetchLikesAnswer, youLiked } = this.props;
    if (youLiked === true) {
      dislikeAnswer(answer.key, issueId);
    } else {
      likeAnswer(answer.key, issueId);
    }
    fetchLikesAnswer(answer.key, issueId);
  }

  render() {
    const { answer, likes, youLiked, appData } = this.props;
    return (
      <div>
        <Segment
          padded
          className="issue-box__answerList aeg-card1"
        >
          <Label attached="top">
            <img
              src={appData.icon_72}
              className="bg-blur-img"
              alt=""
            />
            <img
              src={appData.icon_72}
              className="app-icon"
              alt="App icon"
            /> {answer.appName}
          </Label>
          <span>{answer.body}</span>
          <br />
          <LikeBtn
            handleLikeAnswer={this.handleLikeAnswer}
            likesQt={size(likes)}
            youLiked={youLiked}
          />
        </Segment>

      </div>
    );
  }
}

IssueAnswerItem.propTypes = {
  answer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  likes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  appData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  issueId: PropTypes.string.isRequired,
  fetchLikesAnswer: PropTypes.func.isRequired,
  fetchAppDataAnswer: PropTypes.func.isRequired,
  likeAnswer: PropTypes.func.isRequired,
  dislikeAnswer: PropTypes.func.isRequired,
  youLiked: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  likes: get(state, `answers.list.${ownProps.answer.key}.likesObj`, {}),
  youLiked: has(state, `answers.list.${ownProps.answer.key}.likesObj.${state.auth.id}`, false),
  appData: get(state, `answers.list.${ownProps.answer.key}.appData2`, {}),
});

const mapDispatchToProps = {
  ...answersActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueAnswerItem);
