import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import IssueItem from './IssueItem';
import {map, size} from 'lodash';

class IssueList extends Component {
  static propTypes = {
    // issues: PropTypes.object.isRequired
  };

  renderIssueItems() {
    const {issues} = this.props;
    return map(issues, (issue, index) => {
      return (
        <IssueItem
          key={index}
          issue={issue}
        />
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div className="issue-list small-12 column align-center">
          <h5 className="align-center subheader row">Latest wishes</h5>
          {this.renderIssueItems().reverse()}
        </div>
      </div>
    )
  }
}

export default IssueList
