import React, {PropTypes} from 'react';
import {List} from 'immutable';
import IssueItem from '../issue-item';
import {Link} from 'react-router';


const IssueList = ({deleteIssue, issues, updateIssue, handleIssueClick}) => {
  console.log('from issue list', issues)
  let issueItems = issues.map((issue, index) => {
    return (

        <IssueItem
          deleteIssue={deleteIssue}
          key={index}
          issue={issue}
          updateIssue={updateIssue}
          onClick={handleIssueClick}
        />
    );
  });

  return (
    <div className="issue-list">
      {issueItems}
    </div>
  );
}

// IssueList.propTypes = {
//   deleteIssue: PropTypes.func.isRequired,
//   issues: PropTypes.instanceOf(List).isRequired,
//   updateIssue: PropTypes.func.isRequired
// };

export default IssueList;
