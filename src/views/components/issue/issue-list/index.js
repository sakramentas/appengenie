import React, {PropTypes} from 'react';
import {List} from 'immutable';
import IssueItem from '../issue-item';
import {Link} from 'react-router';


function IssueList({deleteIssue, issues, updateIssue}) {
  let issueItems = issues.map((issue, index) => {
    return (
      <Link to={`/issues/${index}`}>
        <IssueItem
          deleteIssue={deleteIssue}
          key={index}
          issue={issue}
          updateIssue={updateIssue}
        />
      </Link>
    );
  });

  return (
    <div className="issue-list">
      {issueItems}
    </div>
  );
}

IssueList.propTypes = {
  deleteIssue: PropTypes.func.isRequired,
  issues: PropTypes.instanceOf(List).isRequired,
  updateIssue: PropTypes.func.isRequired
};

export default IssueList;
