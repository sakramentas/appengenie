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
    // let {issues} = this.props;
    // console.log('Issues from props itemsssss', this.props.issues)
    return this.props.issues.map((issue, index) => {
      console.log('Issues on map', issue)
      return (
        <IssueItem
          key={index}
          issue={issue}
        />
      );
    });
  }

  render() {
    console.log('Issues from props item', this.props.issues)
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
