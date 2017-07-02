import React, {Component, PropTypes} from 'react';
import {userActions} from 'src/core/user';
import {connect} from 'react-redux';
import {Image} from 'semantic-ui-react';
import {dateFull} from 'src/util/date-formatter';
import {get, has} from 'lodash';
import { Statistic } from 'semantic-ui-react'

class UserProfile extends Component {

  componentWillMount() {
    this.props.fetchUserInfoProfile(this.props.userId);
  }

  render() {
    const items = [
      { label: 'Likes', value: '22' },
      { label: 'Questions', value: '31,200' },
      { label: 'Answers', value: '22' },
    ]
    const {userInfo} = this.props;
    return (
      <div className="profile-page">
        <div className="align-center">
          <Image src={userInfo && userInfo.userImg} alt="avatar" size='small' shape='circular'/>
        </div>
        <div className="row align-center aeg-m-top">
          <h1 className="aeg-p-color">{userInfo.displayName}</h1>
          <span className="">Registered since {dateFull(userInfo.registeredAt)}</span>
        </div>
        <div className="row align-center profile-page-stats">
          <Statistic.Group items={items} color='blue' size='mini' />
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  userInfo: get(state, `user.profile.${ownProps.userId}`, {}),
});

const mapDispatchToProps = {
  ...userActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);