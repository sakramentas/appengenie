import React from 'react';
import PropTypes from 'prop-types';
import IssueForum from '../../components/issue/issue-forum/index';

const IssuePage = props => (
  <div className="issue-page">
    <IssueForum issueKey={props.location.query.id} />
  </div>
);

IssuePage.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default IssuePage;
