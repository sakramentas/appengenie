import {List} from 'immutable';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getNotification, notificationActions} from 'src/core/notification';
import {getIssueFilter, getVisibleIssues, issuesActions} from 'src/core/issues';

import Notification from '../../components/notification';
import IssueFilters from '../../components/issue/issue-filters';
import IssueSearch from '../../components/issue/issue-search';

import IssueList from '../../components/issue/issue-list';
import IssuePage from '../../components/issue/issue-page';

import FirebaseList from '../../../core/firebase'

const pushState = (obj, url) => window.history.pushState(obj, '', url);


export class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIssueId: '',
      pageHeader: 'Issues List',
      loading: true
    }
    this.handleIssuePageClick = ::this.handleIssuePageClick;
    this.renderIssuePage = ::this.renderIssuePage;
    this.setSearchTerm = ::this.setSearchTerm;
  }


  // Load Issues (action)
  componentWillMount() {
    this.props.loadIssues();
    // Filter issues by History api. Param filter
    this.props.filterIssues(this.state.issues);
    this.setState({loading: true})
  }

  // componentWillReceiveProps(nextProps) {
  // If the component will receive another filter, call filterIssues with the filter argument.
  // if (nextProps.filterIssues !== this.props.filterIssues) {
  //   this.props.filterIssues(nextProps.filterIssues);
  // }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.searchTerm !== nextState.searchTerm) {
  //     return true;
  //   }
  //   if (this.props.filterIssues !== nextProps.filterIssues) {
  //     return true;
  //   }
  //   return true;
  // }

  componentWillUnmount() {
    this.props.unloadIssues();
  }

  componentDidMount() {
    this.setState({loading: false})
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
    pushState(
      {currentIssueId: issueKey},
      `/issues/${issueKey}`
    );
    //  let issueItems = this.props.issues.filter((issue, index) => {
    //    return (
    //      <div key={index}>
    //        {issue}
    //      </div>
    //    )
    //  })
    // let selectedIssue = this.props.issues.filter(issue => issue.title == issue[issueKey])
    this.renderIssuePage()

  }

  renderIssuePage() {
    return (
        <IssuePage issues={this.props.issues} />
    )
  }



  setSearchTerm(event) {
    let searchValue = event.target.value;
    if (searchValue.length) {
      this.props.filterIssues(searchValue);
    } else {
      this.props.filterIssues(this.props.issues)
    }
    // this.setState({issuesSize: this.props.issues.size})
    console.log(this.props.issues.size)
  }

  render() {
    return (
      <div className="g-row">
        <div className="g-col">
          <IssueSearch showIssueCreateForm={this.showIssueCreateForm}
                       setSearchTerm={this.setSearchTerm}
                       createIssue={this.props.createIssue}
                       issues={this.props.issues} />

        </div>

        <div className="g-col">
          {/*{this.renderIssuePage()}*/}
          {/*<IssueFilters filter={this.props.filterType}/>*/}
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
