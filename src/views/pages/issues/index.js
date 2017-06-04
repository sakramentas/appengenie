import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getNotification, notificationActions} from 'src/core/notification';
import {getIssueFilter, getVisibleIssues, issuesActions} from 'src/core/issues';

import IssueSearch from '../../components/issue/IssueSearch';
import IssueList from '../../components/issue/IssueList';
import Notification from '../../components/notification';


export class Issues extends Component {
  static propTypes = {
    issues: PropTypes.object.isRequired,
    createIssue: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadIssues();
  }

  componentWillUnmount() {
    this.props.unloadIssues();
  }

  renderNotification() {
    const {notification} = this.props;
    return (
      <Notification
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
          <IssueSearch createIssue={this.props.createIssue}
                       issues={this.props.issues}/>
        </div>

        <div className="g-col">
          <IssueList issues={this.props.issues} />
        </div>

      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getIssueFilter,
  getVisibleIssues,
  (filterType, issues) => ({
    filterType,
    issues
  })
);

const mapDispatchToProps = {...issuesActions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issues);
