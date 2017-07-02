import React, {Component, PropTypes} from 'react';
import IssueForum from '../../components/issue/IssueForum';


export const IssuePage = (props) => {

  return (
    <div className="issue-page">
      <IssueForum issueKey={props.location.query.id}/>
    </div>
  );
};

