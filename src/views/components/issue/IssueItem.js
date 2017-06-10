import React, {Component} from 'react';
import {connect} from 'react-redux';
import {issuesActions} from 'src/core/issues';
import {userActions} from 'src/core/user';
import {Link} from 'react-router';
import appIcon from '../../../images/app-store-icon.png';
import LikeBtn from 'material-ui/svg-icons/action/favorite';
import {red500} from 'material-ui/styles/colors';
import {dateSimple} from 'src/util/date-formatter';
import get from 'lodash/get';

class IssueItem extends Component {

  constructor(props) {
    super(props);
    this.handleIssueClick = ::this.handleIssueClick;
  }

  componentWillMount() {
    let {getMostRecommendedAppIcon, fetchUserInfo, issue} = this.props;
    issue.key ? getMostRecommendedAppIcon(issue.key) : null;
    issue.userId ? fetchUserInfo(issue.userId, issue.key) : null;
  }

  handleIssueClick() {
    this.props.onClick(this.props.issue.key);
  }

  render() {
    const {issue, userInfo} = this.props;
    return (
      <Link to={{pathname: '/issues/page', query: {id: `${issue.key}`}}}>
        <div className="issue-item aeg-card1 align-top row">
          <div className="issue-item-left small-9 column">
            <span className="issue-item-left--bodyText row">
              {issue.body}
            </span>
            <span className="issue-item-left--user row">
              {userInfo ? userInfo.displayName : 'no user data'} • {dateSimple(issue.createdAt)}
            </span>
          </div>
          <div className="issue-item-right small-3 column">
            <div className="row align-center">
              <div className="small-10 column">
                {this.props.mostRecommendedAppIcon ?
                  <img src={this.props.mostRecommendedAppIcon} alt="Icon"/>
                  :
                  <img src={appIcon} alt="Icon"/>
                }
              </div>
              <div className="info-icons small-12 column">
                <div className="like-icon align-middle row align-center">
                  <LikeBtn color={red500}/>
                  <span className="">50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  mostRecommendedAppIcon: get(state, `issues.list.${ownProps.issue.key}.mostRecommendedAppIcon`),
  userInfo: get(state, `user.${ownProps.issue.key}`)
});

const mapDispatchToProps = {
  ...issuesActions,
  ...userActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueItem);


