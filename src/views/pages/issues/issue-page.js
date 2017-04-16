import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/core/notification';
import { getIssueFilter, getIssueFilterSelected, issuesActions } from 'src/core/issues';
// import Notification from '../../components/notification';
// import IssueFilters from '../../components/issue/issue-filters';
// import IssueForm from '../../components/issue/issue-form';
// import IssueList from '../../components/issue/issue-list';
// import IssuePage from '../../components/issue/issue-page';


export class Issue extends Component {

  componentWillMount() {
    console.log('id', this.props.location.query.id)
    // this.props.filterIssues();
    this.props.loadIssues();
    this.props.filterIssueSelected(this.props.location.query.id);

  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.location.query.filter !== this.props.location.query.filter) {
    //   this.props.filterIssues(nextProps.location.query.filter);
    // }
  }

  componentWillUnmount() {
    // this.props.unloadIssues();
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

  render() {
    console.log('issue page', this.props.issues)
    return (
      <div className="g-row">
       ISSUE PAGE
        <IssueBox issues={this.props.issues} />
      </div>
    );
  }
}

const IssueBox = (props) => {
  console.log('esse issue', props.issues)
  return (
    <div>
      {props.issues}
    </div>
  )
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getIssueFilter,
  getIssueFilterSelected,
  (notification, key, issues) => ({
    notification,
    key,
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
