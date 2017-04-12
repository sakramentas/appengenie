import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';


function IssueFilters({filter}) {
  return (
    <ul className="issue-filters">
      <li><Link className={classNames({active: !filter})} to="/">View All</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/', query: {filter: 'active'}}}>Active</Link></li>
      <li><Link activeClassName="active" to={{pathname: '/', query: {filter: 'completed'}}}>Completed</Link></li>
    </ul>
  );
}

IssueFilters.propTypes = {
  filter: PropTypes.string
};

export default IssueFilters;
