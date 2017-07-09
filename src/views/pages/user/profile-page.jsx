import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from '../../components/users/UserProfile';

const ProfilePage = props => (
  <div className="issue-page">
    <UserProfile userId={props.location.query.id} />
  </div>
);

ProfilePage.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ProfilePage;
