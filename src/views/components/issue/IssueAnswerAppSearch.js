import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {answersActions} from 'src/core/answers'
import Q from 'q';

class IssueAnswerAppSearch extends Component {

  constructor(props) {
    super(props);

    this.handleChange = ::this.handleChange;
    this.handleSearch = ::this.handleSearch;

    this.state = {
      searchTerm: '',
      searchResult: [],
      selectedApp: {}
    }
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  handleSearch() {
    let {searchTerm} = this.state;
    let {fetchAppsFromApi, appsFromApi} = this.props;
    Q.fcall(fetchAppsFromApi(searchTerm))
      .then(data => this.setState({searchResult: appsFromApi}));
  }

  handleSelectApp(app) {
    this.setState({selectedApp: {...app}});
    this.props.handleAppData(app);
  }

  render() {
    let {appsFromApi} = this.props;
    return (
      <div>
        <TextField maxLength="100"
                   type="text"
                   hintText="App name"
                   onChange={this.handleChange}
        />
        <SearchIcon onClick={this.handleSearch}/>
        <List>
          {(appsFromApi && !this.state.selectedApp.size > 0) ?
            <div>
              {appsFromApi.map((app, index) => {
                return (
                  <div key={index}>
                    <ListItem primaryText={app.title}
                              leftIcon={<img src={app.icon} alt=""/>}
                              onClick={this.handleSelectApp.bind(this, app)}/>
                    <Divider />
                  </div>
                )
              })}
            </div>
            : null
          }

        </List>
        {this.state.selectedApp.size ?
          <div className="aeg-center">
            <span className="aeg-block">App selected</span>
            <img src={this.state.selectedApp.icon_72} alt=""/>
            <span className="aeg-block">{this.state.selectedApp.title}</span>
          </div>
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appsFromApi: state.answers.appsFromApi.results
});

const mapDispatchToProps = {...answersActions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueAnswerAppSearch);

