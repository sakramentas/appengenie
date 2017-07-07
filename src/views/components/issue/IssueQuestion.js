import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card} from 'material-ui/Card';
import {Link} from 'react-router';
import {Image, Header} from 'semantic-ui-react';
import {dateSimple} from 'src/util/date-formatter';
import {userActions} from 'src/core/user';
import {issueActions} from 'src/core/issue';
import {LikeBtn} from 'src/views/components/actions/LikeBtn';
import {get, has, size} from 'lodash';

class IssueQuestion extends Component {

  constructor(props) {
    super(props);
    this.handleLikeQuestion = this.handleLikeQuestion.bind(this);
  }

  componentWillMount() {
    const {issue, fetchUserInfo, fetchLikesQuestion} = this.props;
    // issue.userId ? fetchUserInfo(issue.userId, issue.key) : null;
    fetchLikesQuestion(issue.key);
  }

  handleLikeQuestion() {
    const {issue, likeQuestion, dislikeQuestion, fetchLikesQuestion, youLiked} = this.props;
    youLiked === true ? dislikeQuestion(issue.key) : likeQuestion(issue.key);
    fetchLikesQuestion(issue.key);
  }

  render() {
    const {issue, userInfo, likes, youLiked} = this.props;
    return (
      <Card className="issue-page_question--card">

        <div className="issue-page_question row small-collapse align-center">
          <div className="issue-page_question__bodyText small-12 column">
            <h2><span className="issue-page_question__wish--text">I wish there was an App to</span> {issue.body}</h2>
          </div>
          <div className="issue-page_question__bottom small-12 column align-middle">

            {/*<div className="issue-page_question__avatar small-3 column text-center small-collapse">*/}
            {/*<Link to={{pathname: '/users/profile', query: {id: `${userInfo.uid}`}}}>*/}
            {/*<Image src={userInfo && userInfo.userImg} alt="avatar" size='medium' shape='circular'/>*/}
            {/*</Link>*/}
            {/*</div>*/}
            <Header as='h4'>
              <Image
                shape='circular'
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
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  likes: get(state, `issue.likes`, {}),
  userInfo: get(state, `user.${ownProps.issue.key}`, {}),
  youLiked: has(state, `issue.likes.${state.auth.id}`, false)
});

const mapDispatchToProps = {
  ...userActions,
  ...issueActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueQuestion);
