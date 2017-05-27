import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {answersActions} from 'src/core/answers'

import appStoreBadge from '../../../../images/appstore-download-img.svg';
import playStoreBadge from '../../../../images/playstore-download-img.png';

class AppRank extends Component {


  componentWillMount() {
    this.props.listAppRank(this.props.issue.key);
  }

  render() {
    let {mostLikedApp, appIcon} = this.props;
    return (
      <div>
        {mostLikedApp ?
          <div className='appRank-box aeg-card1'>
            <div className='appRank-box-mostLiked'>
              <span className="appRank-box-mostLiked--title">Most Recommended App</span>
              {appIcon && <img src={appIcon} className="" />}
              <span className="appRank-box-mostLiked--app aeg-block">{mostLikedApp}</span>
              <div className="appRank-box-mostLiked--download">
                <a href={`https://www.apple.com/ie/search/${mostLikedApp}?src=serp`} target="_blank"><img
                  src={appStoreBadge} className="appStore-badge"/></a>
                <a href={`https://play.google.com/store/search?q=${mostLikedApp}`} target="_blank"><img
                  src={playStoreBadge} className="playStore-badge"/></a>
              </div>
            </div>
          </div>
          : null }
      </div>
    )
  }
}

const apprankStyles = {
  marginTop: '10px'
};

const mapStateToProps = state => ({
  mostLikedApp: state.answers.mostLikedApp,
  appIcon: state.answers.appIcon
});

const mapDispatchToProps = Object.assign(
  {},
  answersActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRank);
