import React, {Component, PropTypes} from 'react';
import UserProfile from '../../components/users/UserProfile';

export const ProfilePage = (props) => {

  return (
    <div className="issue-page">
      <UserProfile userId={props.location.query.id} />
    </div>
  );
};


