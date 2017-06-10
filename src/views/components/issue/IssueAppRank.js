import React, {Component} from 'react';
import {connect} from 'react-redux';
import {issueActions} from 'src/core/issue'

import appStoreBadge from '../../../images/appstore-download-img.svg';
import playStoreBadge from '../../../images/playstore-download-img.png';

class IssueAppRank extends Component {

  componentWillMount() {
    const {fetchIssueAppRank, issueKey} = this.props;
    fetchIssueAppRank(issueKey)
  }

  render() {
    const {mostRecommendedApp, genieData} = this.props;
    let mostRecommendedAppData = mostRecommendedApp && mostRecommendedApp.appData;
    return (
      <div>
        {mostRecommendedAppData ?
          <div className='appRank-box aeg-card1'>
            <div className='appRank-box-mostLiked'>
              <span className="appRank-box-mostLiked--title">Most Recommended App</span>
              <h4 className="appRank-box-mostLiked--title subheader">Genie: {genieData.displayName}</h4>
              <img src={mostRecommendedAppData.icon_72} className=""/>
              <span className="appRank-box-mostLiked--app aeg-block">{mostRecommendedAppData.title}</span>
              <div className="appRank-box-mostLiked--download">
                <a href={`https://www.apple.com/ie/search/${mostRecommendedAppData.title}?src=serp`} target="_blank"><img
                  src={appStoreBadge} className="appStore-badge"/></a>
                <a href={`https://play.google.com/store/search?q=${mostRecommendedAppData.title}`} target="_blank"><img
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
  mostRecommendedApp: state.issue.mostRecommendedApp,
  genieData: state.issue.user
});

const mapDispatchToProps = {
  ...issueActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueAppRank);
