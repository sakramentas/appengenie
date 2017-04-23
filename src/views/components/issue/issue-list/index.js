import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import IssueItem from '../issue-item';

class IssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    this.setState({loading: true});
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  issueItems() {
    let {issues} = this.props;
    return issues.map((issue, index) => {
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
      <div className="issue-list">
        {this.state.loading === true ?
          <CircularProgress />
          :
          <div>
            <span>Latest wishes</span>
            {this.issueItems()}
          </div>
        }
      </div>
    )
  }
}

export default IssueList
