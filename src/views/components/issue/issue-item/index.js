import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';
import {Issue} from 'src/core/issues';
import IssuePage from '../issue-page';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import appicon from '../../../../images/app-store-icon.png';

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


  renderIssuePage(issue) {
    return (
      <IssuePage
        title={issue}
      />
    );
  }

  handleIssueClick() {
    // console.log(this.props.issue.key)
    this.props.onClick(this.props.issue.key);
  }

  render() {

    const {issue} = this.props;
    console.log(issue.key)

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
          <img src={appicon} alt="Icon" />
        </div>
      </div>
      </Link>
    );
  }
}

export default IssueItem;
