import React from 'react';
import PropTypes from 'prop-types';

const AlertShort = ({ text, openIssueForm }) => (
  <div className="row align-middle align-center aeg-card1">
    <span className="small-12 column text-center aeg-alert1">
      We couldn&apos;t find any wish based on your search.
    </span>
    <div
      className="small-12 column text-center"
      onClick={openIssueForm}
      role="presentation"
    >
      <h2>Create a wish with <span className="subheader aeg-p-color">{text}</span></h2>
    </div>
  </div>
);

AlertShort.propTypes = {
  text: PropTypes.string.isRequired,
  openIssueForm: PropTypes.func.isRequired,
};

export default AlertShort;
