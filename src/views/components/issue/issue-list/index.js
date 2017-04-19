import React, {PropTypes} from 'react';
import {List} from 'immutable';
import IssueItem from '../issue-item';
import {Link} from 'react-router';


const IssueList = ({issues}) => {

  let issueItems = issues.map((issue, index) => {
    return (
        <IssueItem
          key={index}
          issue={issue}
        />
    );
  });

  return (
    <div className="issue-list">
      <span>Latest wishes</span>
      {issueItems}
    </div>
  );
};

export default IssueList;
