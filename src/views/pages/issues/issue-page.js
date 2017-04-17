import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/core/notification';
import { getIssueFilter, getVisibleIssues, issuesActions } from 'src/core/issues';
// import Notification from '../../components/notification';
// import IssueFilters from '../../components/issue/issue-filters';
// import IssueForm from '../../components/issue/issue-form';
// import IssueList from '../../components/issue/issue-list';
// import IssuePage from '../../components/issue/issue-page';


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
    return this.props.issues.map((issue, index) => {
      if (issue.key === this.props.location.query.id) {
        return (<IssueBox issue={issue} key={index} />)
      }
    })
  }

  render() {
    console.log('issue page', this.props.issues)
    // console.log('medo ', this.loadSelectedIssue())
    return (
      <div className="issue-page">
       ISSUE PAGE
        {this.loadSelectedIssue()}
      </div>
    );
  }
}

const IssueBox = ({issue}) => {
  // console.log('esse issue', props)
  return (
    <div className="issue-box__question">
      <h3>{issue.title}</h3>
      <span>{issue.details}</span>
    </div>
  )
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getIssueFilter,
  getVisibleIssues,
  (notification, filterType, issues) => ({
    notification,
    filterType,
    issues
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
