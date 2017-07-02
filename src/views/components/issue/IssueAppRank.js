import React, {Component} from 'react';
import {connect} from 'react-redux';
import {issueActions} from 'src/core/issue'
import get from 'lodash/get';
import appStoreBadge from '../../../images/appstore-download-img.svg';
import playStoreBadge from '../../../images/playstore-download-img.png';

class IssueAppRank extends Component {

  componentWillMount() {
    const {fetchIssueAppRank, issueKey, fetchAppDataIssueAppRank} = this.props;
    fetchIssueAppRank(issueKey);
  }

  render() {
    const {mostRecommendedApp, genieData} = this.props;
    console.log('most recommended ', mostRecommendedApp)
    // let mostRecommendedAppData = mostRecommendedApp && mostRecommendedApp.appData;
    return (
      <div>
        {mostRecommendedApp ?
          <div className='appRank-box aeg-card1'>
            <div className="bg-blur-img" style={{backgroundImage: `url(${mostRecommendedApp.icon_72})`}}></div>
            <div className='appRank-box-mostLiked row'>
              <div className="small-9 column align-left">
                <span className="appRank-box-mostLiked--app aeg-block">{mostRecommendedApp.title}</span>
                <span className="subheader">{mostRecommendedApp.short_desc}</span>
              </div>
              <div className="small-3 column">
                <img src={mostRecommendedApp.icon_72} className=""/>
              </div>
              {/*<span className="appRank-box-mostLiked--title">Most Recommended App</span>*/}

              <div className="appRank-box-mostLiked--download row align-middle">
                <div className="small-6 column">
                  <a href={`https://www.apple.com/ie/search/${mostRecommendedApp.title}?src=serp`} target="_blank"><img
                    src={appStoreBadge} className="appStore-badge"/></a>
                </div>
                <div className="small-6 column">
                  <a href={mostRecommendedApp.market_url} target="_blank"><img
                    src={playStoreBadge} className="playStore-badge"/></a>
                </div>
              </div>
            </div>
          </div>
          : null }
      </div>
    )
  }
}

// const apprankStyles = {background: `url(${mostRecommendedApp.icon_72})`};

const mapStateToProps = state => ({
  mostRecommendedApp: get(state, 'issue.mostRecommendedApp', {}),
  genieData: get(state, 'issue.user', {})
});

const mapDispatchToProps = {
  ...issueActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueAppRank);
