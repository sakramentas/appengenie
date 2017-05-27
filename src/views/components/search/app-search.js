import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import {escapeRegexCharacters} from '../../../helpers'
import axios from 'axios';
import debounce from 'lodash/debounce'

class AppSearch extends Component {

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

  componentWillMount() {

  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  handleSearch() {
    let {searchTerm} = this.state;
    axios.get('https://data.42matters.com/api/v2.0/android/apps/search.json', {
      params: {
        access_token: '447c10686ce94632d921e9c5f015c42974b2e792',
        q: searchTerm,
        lang: 'en',
        limit: 5
      }
    })
      .then(response => {
        this.setState({searchResult: response.data.results});
        console.log('RESPONSE AXIOS', searchTerm, this.state.searchResult)
      })
      .catch(err => console.log(err))
  }

  handleSelectApp(app) {
    console.log('AAAAAAPPP', app)
    this.setState({selectedApp: {...app}})
    this.props.handleAppData(app)
    console.log('STATE APP', this.state.selectedApp)
  }


  render() {
    const {searchResult, selectedApp} = this.state;
    return (
      <div>
        <TextField maxLength="100"
                   type="text"
                   hintText="App name"
                   onChange={this.handleChange}
        />
        <FlatButton label="Search" secondary={true} onClick={this.handleSearch}/>
        <List>
          {(searchResult.length && !this.state.selectedApp.size) ?
            <div>
              {searchResult.map((app, index) => {
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

export default AppSearch;
