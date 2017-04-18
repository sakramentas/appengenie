import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';
import {Issue} from 'src/core/issues';
import IssuePage from '../issue-page';
import {Link} from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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

    return (
      <Card className={'issue-item'}>
        <CardHeader
          title={issue.title}
          subtitle={issue.details}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <Link activeClassName="active" to={{pathname: '/issues/page', query: {id: `${this.props.issue.key}`}}}>
            <FlatButton label="Open"/>
          </Link>
        </CardActions>
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>

    );
  }
}

export default IssueItem;
