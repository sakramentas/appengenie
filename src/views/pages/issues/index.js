import {List} from 'immutable';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getNotification, notificationActions} from 'src/core/notification';
import {getIssueFilter, getVisibleIssues, issuesActions} from 'src/core/issues';
import Notification from '../../components/notification';
import IssueFilters from '../../components/issue/issue-filters';
import IssueForm from '../../components/issue/issue-form';
import IssueList from '../../components/issue/issue-list';
import IssuePage from '../../components/issue/issue-page';

import FirebaseList from '../../../core/firebase'

const pushState = (obj, url) => window.history.pushState(obj, '', url);


export class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIssueId: '',
      pageHeader: 'Issues List'
    }
    this.handleIssuePageClick = ::this.handleIssuePageClick;
    this.renderIssuePage = ::this.renderIssuePage;
  }

  // static propTypes = {
  //   createIssue: PropTypes.func.isRequired,
  //   deleteIssue: PropTypes.func.isRequired,
  //   dismissNotification: PropTypes.func.isRequired,
  //   filterIssues: PropTypes.func.isRequired,
  //   filterType: PropTypes.string.isRequired,
  //   loadIssues: PropTypes.func.isRequired,
  //   location: PropTypes.object.isRequired,
  //   notification: PropTypes.object.isRequired,
  //   issues: PropTypes.instanceOf(List).isRequired,
  //   undeleteIssue: PropTypes.func.isRequired,
  //   unloadIssues: PropTypes.func.isRequired,
  //   updateIssue: PropTypes.func.isRequired
  // };

  componentWillMount() {
    this.props.loadIssues();
    this.props.filterIssues(this.props.location.query.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.filter !== this.props.location.query.filter) {
      this.props.filterIssues(nextProps.location.query.filter);
    }
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

  handleIssuePageClick(issueKey) {

    this.setState({
      currentIssueId: issueKey,
      pageHeader: 'Issue selected'
    });

    // return console.log('handling click', e.target.value)
    //  pushState(
    //    {currentIssueId: issueId},
    //    `/issues/${issueId}`
    //  );
    //  let issueItems = this.props.issues.filter((issue, index) => {
    //    return (
    //      <div key={index}>
    //        {issue}
    //      </div>
    //    )
    //  })
    // let selectedIssue = this.props.issues.filter(issue => issue.title == issue[issueKey])


  }

  renderIssuePage() {
    return (
      (this.state.currentIssueId !== '') ? <IssuePage issues={this.props.issues} key={this.state.currentIssueId} id={this.state.currentIssueId}/> : ''
    )
  }

  render() {
    return (
      <div className="g-row">
        <div className="g-col">
          {this.state.pageHeader}
          <IssueForm createIssue={this.props.createIssue}/>
        </div>

        <div className="g-col">
          {this.renderIssuePage()}
          <IssueFilters filter={this.props.filterType}/>
          <IssueList
            deleteIssue={this.props.deleteIssue}
            issues={this.props.issues}
            updateIssue={this.props.updateIssue}
            handleIssueClick={this.handleIssuePageClick}
          />
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
