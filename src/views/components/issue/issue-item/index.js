import React, {Component, PropTypes} from 'react';
import {Issue} from 'src/core/issues';
import {Link} from 'react-router';
import appIcon from '../../../../images/app-store-icon.png';

class IssueItem extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleIssueClick = ::this.handleIssueClick;
  }

  renderTitle(issue) {
    return (
      <div className="issue-item__title">
      <span
        ref={c => this.titleText = c}
        tabIndex="0">{issue.title}
      </span>
        <span className="issue-item__details">{issue.details}</span>
      </div>
    );
  }

  handleIssueClick() {
    this.props.onClick(this.props.issue.key);
  }

  render() {
    const {issue} = this.props;
    return (
      <Link activeClassName="active" to={{pathname: '/issues/page', query: {id: `${issue.key}`}}}>
        <div className="issue-item">
          <div className="issue-item-left">
          <span className="issue-item-left--bodyText">
            {issue.body}
          </span>
            <span className="issue-item-left--user">
            {issue.user.displayName}
          </span>
          </div>
          <div className="issue-item-right">
            <img src={appIcon} alt="Icon"/>
          </div>
        </div>
      </Link>
    );
  }
}

export default IssueItem;
