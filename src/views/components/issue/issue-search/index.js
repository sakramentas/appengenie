import React, {Component, PropTypes} from 'react';
import {Redirect} from 'react-router'
import IssueCreate from '../issue-create';
import AutoComplete from 'material-ui/AutoComplete';

class IssueSearch extends Component {
  // static propTypes = {
  //   createIssue: PropTypes.func.isRequired
  // };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
    this.renderIssueCreate = ::this.renderIssueCreate;

    this.state = {
      keyword: '',
      issuesFiltered: []
    }
  }

  onChange(event) {
    this.props.setSearchTerm(event);
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {title, details, answers} = this.state;
    if (title.length) this.props.createIssue(title, details, answers);
    this.clearInput();
  }

  renderIssueCreate() {
    if (this.props.issues.size != null && this.props.issues.size <= 0) {
      return (
        <IssueCreate createIssue={this.props.createIssue}/>
      )
    }
  }

  redirectToIssuePage() {
    return (<Redirect to="/issue/"/>)
  }

  handleUpdateInput = (value) => {
    this.setState({keyword: value})
  };

  componentWillMount() {
    setTimeout(() => {
      let issuesArray = []
      this.props.issues.forEach((issue, index) => issuesArray.push([issue.title, issue.key]))
      this.setState({issuesFiltered: issuesArray})
      console.log(this.state.issuesFiltered)
    }, 3000)
  }


  render() {
    return (
      <div>
        <div className="issue-search">
          <span>I wish there was an APP to...</span>
          {/*<input*/}
          {/*autoComplete="off"*/}
          {/*autoFocus*/}
          {/*className="issue-search__input"*/}
          {/*maxLength="64"*/}
          {/*onChange={this.onChange}*/}
          {/*onKeyUp={this.onKeyUp}*/}
          {/*placeholder=""*/}
          {/*ref={c => this.titleInput = c}*/}
          {/*type="text"*/}

          {/*/>*/}
          <AutoComplete
            hintText="Type anything"
            dataSource={[...this.props.issues].map(issue => issue.title.toLowerCase())}
            openOnFocus={true}
            fullWidth={true}
            onSubmit={this.redirectToIssuePage}
            onUpdateInput={this.handleUpdateInput}
          />
        </div>
        {this.renderIssueCreate()}
      </div>
    );
  }
}

export default IssueSearch;
