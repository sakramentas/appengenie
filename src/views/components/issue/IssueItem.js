import React, {Component} from 'react';
import {connect} from 'react-redux';
import {issuesActions} from 'src/core/issues';
import {userActions} from 'src/core/user';
import {Link} from 'react-router';
import {dateSimple} from 'src/util/date-formatter';
import {get, size} from 'lodash';
import {Icon} from 'semantic-ui-react';


class IssueItem extends Component {

  constructor(props) {
    super(props);
    this.handleIssueClick = ::this.handleIssueClick;
  }

  componentWillMount() {
    let {getMostRecommendedAppIcon, fetchUserInfo, issue, fetchLikesQuestion} = this.props;
    issue.key ? getMostRecommendedAppIcon(issue.key) : null;
    issue.userId ? fetchUserInfo(issue.userId, issue.key) : null;
    issue.likes ? fetchLikesQuestion(issue.key) : null;
  }

  handleIssueClick() {
    this.props.onClick(this.props.issue.key);
  }

  render() {
    const {issue, userInfo, likesOnQuestion, answersCounter, mostRecommendedAppIcon} = this.props;
    return (
      <Link to={{pathname: '/issues/page', query: {id: `${issue.key}`}}}>
        <div className="issue-item aeg-card1 align-top row small-collapse">
          <div className="small-9 column">
            <div className="issue-item-left small-9 column">
            <span className="issue-item-left--bodyText row">
              {issue.body}
            </span>
              <span className="issue-item-left--user row">
              {userInfo ? userInfo.displayName : 'no user data'} • {dateSimple(issue.createdAt)}
            </span>
            </div>
            <div className="info-icons small-12 column">
              <div className="like-icon align-middle row align-left aeg-m-top">
                <div className="small-4 column info-icons--likes">
                  <Icon name="thumbs up" color="red"/>
                  <span className="">{size(likesOnQuestion)}</span>
                </div>
                <div className="small-4 column info-icons--answers">
                  <Icon name='comments' color="blue"/>
                  <span className="">{size(answersCounter)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="small-3 column">
            <div className="issue-item-right row align-center">
              <img src={mostRecommendedAppIcon} alt="Icon" className="issue-item-mostRecommendedAppIcon"/>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

const appIconDefault = 'https://km.support.apple.com/resources/sites/APPLE/content/live/IMAGES/0/IM282/en_US/mac-app-store-480.png';
const mapStateToProps = (state, ownProps) => ({
  mostRecommendedAppIcon: get(state, `issues.list.${ownProps.issue.key}.mostRecommendedAppIcon`, appIconDefault),
  // userInfo: get(state, `issues.list.${ownProps.issue.key}.user`, {}),
  userInfo: get(state, `user.${ownProps.issue.key}`, {}),
  likesOnQuestion: get(state, `issues.list.${ownProps.issue.key}.likes`, {}),
  answersCounter: get(state, `issues.list.${ownProps.issue.key}.answers`, {}),
});

const mapDispatchToProps = {
  ...issuesActions,
  ...userActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueItem);


