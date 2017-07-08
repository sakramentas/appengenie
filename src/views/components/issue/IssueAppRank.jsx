import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { issueActions } from '../../../core/issue';
import appStoreBadge from '../../../images/appstore-download-img.svg';
import playStoreBadge from '../../../images/playstore-download-img.png';

class IssueAppRank extends Component {

  componentWillMount() {
    const { fetchIssueAppRank, issueKey } = this.props;
    fetchIssueAppRank(issueKey);
  }

  render() {
    const { mostRecommendedApp } = this.props;
    return (
      <div>
        {mostRecommendedApp ?
          <div className="appRank-box aeg-card1">
            <div
              className="bg-blur-img"
              style={{ backgroundImage: `url(${mostRecommendedApp.icon_72})` }}
            />
            <div className="appRank-box-mostLiked row">
              <div className="small-9 column align-left">
                <span className="appRank-box-mostLiked--app aeg-block">
                  {mostRecommendedApp.title}
                </span>
                <span className="subheader">{mostRecommendedApp.short_desc}</span>
              </div>
              <div className="small-3 column">
                <img
                  src={mostRecommendedApp.icon_72}
                  alt="Most recommended app icon"
                />
              </div>

              <div className="appRank-box-mostLiked--download small-12 column">
                <div className="row align-middle aeg-m-top">
                  <div className="small-6 column">
                    <a
                      href={`https://www.apple.com/ie/search/${mostRecommendedApp.title}?src=serp`}
                      target="_blank"
                    >
                      <img
                        src={appStoreBadge}
                        className="appStore-badge"
                        alt="App store badge"
                      />
                    </a>
                  </div>
                  <div className="small-6 column">
                    <a
                      href={mostRecommendedApp.market_url}
                      target="_blank"
                    >
                      <img
                        src={playStoreBadge}
                        className="playStore-badge"
                        alt="Play store badge"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null }
      </div>
    );
  }
}

IssueAppRank.propTypes = {
  issueKey: PropTypes.string.isRequired,
  fetchIssueAppRank: PropTypes.func.isRequired,
  mostRecommendedApp: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  mostRecommendedApp: get(state, 'issue.mostRecommendedApp', {}),
  genieData: get(state, 'issue.user', {}),
});

const mapDispatchToProps = {
  ...issueActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueAppRank);
