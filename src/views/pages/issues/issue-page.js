import React, {Component, PropTypes} from 'react';
import IssueForum from '../../components/issue/IssueForum';


export class Issue extends Component {

  render() {
    return (
      <div className="issue-page">
        <IssueForum issueKey={this.props.location.query.id}/>
      </div>
    );
  }
}

export default Issue
