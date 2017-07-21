import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import IssueItem from './issue-item/index';

class IssueList extends Component {

  renderIssueItems() {
    const { issues } = this.props;
    return map(issues, (issue, index) => (
      <IssueItem
        key={index}
        issue={issue}
      />
    ));
  }

  render() {
    return (
      <div className="row">
        <div className="issue-list small-12 column align-center">
          <h6 className="align-center subheader row aeg-p-color">Latest wishes</h6>
          {this.renderIssueItems().reverse()}
        </div>
      </div>
    );
  }
}

IssueList.propTypes = {
  issues: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default IssueList;

