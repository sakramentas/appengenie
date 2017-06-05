import React from 'react';

const AlertShort = ({text, openIssueForm}) => {

  return (
    <div className="row align-middle align-center aeg-card1">
      <span className="small-12 column text-center aeg-alert1">
        We couldn't find any wish based on your search.
      </span>
      <div className="small-12 column text-center"
           onClick={openIssueForm}>
        <h2>Create a wish with <span className="subheader aeg-p-color">{text}</span></h2>
      </div>
    </div>
  );
};

export default AlertShort;
