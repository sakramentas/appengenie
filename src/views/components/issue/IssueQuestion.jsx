import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import { Image, Header } from 'semantic-ui-react';
import { get, has, size } from 'lodash';
import PropTypes from 'prop-types';
import { dateSimple } from '../../../util/date-formatter';
import { userActions } from '../../../core/user';
import { issueActions } from '../../../core/issue';
import LikeBtn from '../actions/LikeBtn';

class IssueQuestion extends Component {

  constructor(props) {
    super(props);
    this.handleLikeQuestion = this.handleLikeQuestion.bind(this);
  }

  componentWillMount() {
    const { issue, fetchLikesQuestion } = this.props;
    // issue.userId ? fetchUserInfo(issue.userId, issue.key) : null;
    fetchLikesQuestion(issue.key);
  }

  handleLikeQuestion() {
    const { issue, likeQuestion, dislikeQuestion, fetchLikesQuestion, youLiked } = this.props;
    if (youLiked) {
      dislikeQuestion(issue.key);
    } else {
      likeQuestion(issue.key);
    }
    fetchLikesQuestion(issue.key);
  }

  render() {
    const { issue, userInfo, likes, youLiked } = this.props;
    return (
      <Card className="issue-page_question--card">

        <div className="issue-page_question row small-collapse align-center">
          <div className="issue-page_question__bodyText small-12 column">
            <h2>
              <span className="issue-page_question__wish--text">I wish there was an App to</span>
              {issue.body}
            </h2>
          </div>
          <div className="issue-page_question__bottom small-12 column align-middle">
            <Header as="h4">
              <Image
                shape="circular"
                src={userInfo && userInfo.userImg}
              />
              <Header.Content>
                {userInfo && userInfo.displayName}
                <Header.Subheader>
                  <h6 className="aeg-p-color">Wisher</h6>
                </Header.Subheader>
                <Header.Subheader>
                  <h6>Created on {dateSimple(issue.createdAt)}</h6>
                </Header.Subheader>
              </Header.Content>
            </Header>
            <LikeBtn
              handleLikeAnswer={this.handleLikeQuestion}
              likesQt={size(likes)}
              youLiked={youLiked}
            />
          </div>

        </div>
      </Card>
    );
  }
}

IssueQuestion.propTypes = {
  likes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  issue: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userInfo: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  youLiked: PropTypes.bool.isRequired,
  fetchLikesQuestion: PropTypes.func.isRequired,
  likeQuestion: PropTypes.func.isRequired,
  dislikeQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  likes: get(state, 'issue.likes', {}),
  userInfo: get(state, `user.${ownProps.issue.key}`, {}),
  youLiked: has(state, `issue.likes.${state.auth.id}`, false),
});

const mapDispatchToProps = {
  ...userActions,
  ...issueActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueQuestion);
