import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Button, Card, Image} from 'semantic-ui-react'
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
      <div className="small-12 column">
        <div className="row small-collapse">
          <div className="small-10 column">
            <Input maxLength="150"
                   focus
                   placeholder="App name"
                   onChange={this.handleChange}
                   fluid
            />
          </div>
          <div className="small-2 column text-center">
            <Button circular primary icon='search' onClick={this.handleSearch}/>
          </div>
        </div>
        {(appsFromApi && !this.state.selectedApp.size > 0) ?
          <Card.Group className="aeg-card-group">
            {appsFromApi.map((app, index) => {
              return (
                <Card onClick={this.handleSelectApp.bind(this, app)}
                      key={index}
                      fluid>
                  <Card.Content>
                    <Image floated='right' size='mini' src={app.icon_72}/>
                    <Card.Header>{app.title}</Card.Header>
                    <Card.Meta>{app.downloads} downloads</Card.Meta>
                    <Card.Description>{app.short_desc}</Card.Description>
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
          : null
        }

        {this.state.selectedApp.size ?
          <div className="text-center row align-center">
            <span className="small-12 column subheader">App selected</span>
            <div className="small-12 column">
              <img src={this.state.selectedApp.icon_72} alt=""/>
            </div>
            <h1 className="aeg-p-color">{this.state.selectedApp.title}</h1>
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

