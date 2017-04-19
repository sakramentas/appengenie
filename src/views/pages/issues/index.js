import {List} from 'immutable';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getNotification, notificationActions} from 'src/core/notification';
import {getIssueFilter, getVisibleIssues, issuesActions} from 'src/core/issues';

import Notification from '../../components/notification';
import IssueSearch from '../../components/issue/issue-search';

import IssueList from '../../components/issue/issue-list';
import IssuePage from '../../components/issue/issue-page';


export class Issues extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    this.props.loadIssues();
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  componentWillUnmount() {
    this.props.unloadIssues();
  }

  renderNotification() {
    const {notification} = this.props;
    return (
      <Notification
        action={this.props.undeleteIssue}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }

  render() {
    return (
      <div className="g-row">
        <div className="g-col">
          <IssueSearch showIssueCreateForm={this.showIssueCreateForm}
                       createIssue={this.props.createIssue}
                       issues={this.props.issues}/>
        </div>

        <div className="g-col">
          <IssueList issues={this.props.issues} />
        </div>

        {this.props.notification.display ? this.renderNotification() : null}
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
)(Issues);
