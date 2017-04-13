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
  console.log(props.id)

  let issueSelected = props.issues
    .filter((issue) => {
      return issue.key === props.id
    })
    .map(el => el.details);

  let issueSelected2 = props.issues
    .reduce((result, line) => {
      result[line] = result[line] || []
      result[line].push(result[line[0]])
      return result
    }, [])

  console.log('issueselected',issueSelected2)

  return (
    <div className="issue-list">
      Issue selected
      {issueSelected}
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
