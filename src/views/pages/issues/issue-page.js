import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';

import { getNotification, notificationActions } from 'src/core/notification';
import { getIssueFilter, getVisibleIssues, issuesActions } from 'src/core/issues';
import {IssuePageForum} from '../../components/issue/issue-page';

import RaisedButton from 'material-ui/RaisedButton';

export class Issue extends Component {

  componentWillMount() {
    this.props.loadIssues();
  }

  renderNotification() {
    // const { notification } = this.props;
    // return (
    //   <Notification
    //     action={this.props.undeleteIssue}
    //     actionLabel={notification.actionLabel}
    //     dismiss={this.props.dismissNotification}
    //     display={notification.display}
    //     message={notification.message}
    //   />
    // );
  }

  loadSelectedIssue() {
    let {createIssueAnswer, loadIssueAnswers, issues, location, auth} = this.props;
    return issues.map((issue, index) => { //TODO: get the selected issue with getVisibleIssues selector
      // console.log('Auth key', this.props.auth.id)
      if (issue.key === location.query.id) {
        return (<IssuePageForum issue={issue}
                                key={index}
                                createIssueAnswer={createIssueAnswer}
                                answerId={auth.id}
        />)
      }
    })
  }

  render() {
    console.log('issue page', this.props.issues)
    return (
      <div className="issue-page">
       ISSUE PAGE
        {this.loadSelectedIssue()}
      </div>
    );
  }
}




//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getIssueFilter,
  getVisibleIssues,
  getAuth,
  (notification, filterType, issues, auth) => ({
    notification,
    filterType,
    issues,
    auth
  })
);

const mapDispatchToProps = Object.assign(
  {},
  issuesActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue);
