import React, { PropTypes } from 'react';
import { List } from 'immutable';
import IssueItem from '../issue-item';


function IssuePage(props) {
  // let issueItems = issues.map((issue, index) => {
  //   return (
  //     <IssueItem
  //       deleteIssue={deleteIssue}
  //       key={index}
  //       issue={issue}
  //       updateIssue={updateIssue}
  //     />
  //   );
  // });

  return (
    <div className="issue-list">
      Issue selected
      {issueItems}
    </div>
  );
}
//
// IssuePage.propTypes = {
//   deleteIssue: PropTypes.func.isRequired,
//   issues: PropTypes.instanceOf(List).isRequired,
//   updateIssue: PropTypes.func.isRequired
// };

export default IssuePage;
