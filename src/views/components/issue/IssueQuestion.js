import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card} from 'material-ui/Card';
import {Image} from 'semantic-ui-react'
import {dateSimple} from 'src/util/date-formatter';
import {userActions} from 'src/core/user';
import get from 'lodash/get';

class IssueQuestion extends Component {

  componentWillMount() {
    const {issue, fetchUserInfo} = this.props;
    issue.userId ? fetchUserInfo(issue.userId, issue.key) : null
  }

  render() {
    const {issue, userInfo} = this.props;
    return (
      <Card className="issue-page_question--card">

        <div className="issue-page_question row small-collapse align-center">
          <div className="issue-page_question__bodyText small-12 column">
            <h2><span className="issue-page_question__wish--text">I wish there was an App to</span> {issue.body}</h2>
          </div>
          <div className="issue-page_question__bottom row align-middle">
            <h6 className="subheader small-2 column aeg-p-color">Wisher</h6>
            <div className="issue-page_question__avatar small-3 column text-center small-collapse">
              <Image src={userInfo && userInfo.userImg} alt="avatar" size='medium' shape='circular'/>
            </div>
            <div className="issue-page_question__userName small-7 column">
              <h3>{userInfo && userInfo.displayName}</h3>
              <span className="subheader">{dateSimple(issue.createdAt)}</span>
            </div>
          </div>
        </div>
      </Card>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  userInfo: get(state, `user.${ownProps.issue.key}`),
});

const mapDispatchToProps = {
  ...userActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueQuestion);
