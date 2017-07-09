import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getIssueFilter, getVisibleIssues, issuesActions } from '../../../core/issues';
import IssueSearch from '../../components/issue/IssueSearch';
import IssueList from '../../components/issue/IssueList';

class Issues extends Component {

  componentWillMount() {
    this.props.fetchIssues();
  }

  render() {
    return (
      <div>
        <IssueSearch
          createIssue={this.props.createIssue}
          issues={this.props.issues}
        />
        <div className="small-12 column">
          <IssueList issues={this.props.issues} />
        </div>
      </div>
    );
  }
}

Issues.propTypes = {
  issues: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createIssue: PropTypes.func.isRequired,
  fetchIssues: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  getIssueFilter,
  getVisibleIssues,
  (filterType, issues) => ({
    filterType,
    issues,
  }),
);

const mapDispatchToProps = { ...issuesActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issues);
