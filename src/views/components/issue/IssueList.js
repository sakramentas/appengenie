import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import IssueItem from './IssueItem';

class IssueList extends Component {
  static propTypes = {
    issues: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  renderIssueItems() {
    return this.props.issues.map((issue, index) => {
      return (
        <IssueItem
          key={index}
          issue={issue}
        />
      );
    });
  }

  render() {
    return (
      <div className="row">
        {(this.props.issues.length < 1) ?
          <CircularProgress />
          :
          <div className="issue-list small-12 column align-center">
            <h5 className="align-center subheader row">Latest wishes</h5>
            {this.renderIssueItems()}
          </div>
        }
      </div>
    )
  }
}

export default IssueList
