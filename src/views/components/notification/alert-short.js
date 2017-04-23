import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const AlertShort = ({text, openIssueForm}) => {

  return (
    <div className="alert-short__box">
      <span>We couldn't find any wish based on your search.</span>
      <RaisedButton onClick={openIssueForm}
                    label={`Create a wish with ${text}`}
                    secondary={true}/>
    </div>
  );
};

export default AlertShort;
