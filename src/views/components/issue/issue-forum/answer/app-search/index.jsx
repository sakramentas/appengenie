import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Card, Image } from 'semantic-ui-react';
import Q from 'q';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { answersActions } from 'src/core/answers';

class IssueAnswerAppSearch extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectApp = this.handleSelectApp.bind(this);

    this.state = {
      searchTerm: '',
      searchResult: [],
      selectedApp: {},
    };
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearch() {
    const { searchTerm } = this.state;
    const { fetchAppsFromApi, appsFromApi } = this.props;
    Q.fcall(fetchAppsFromApi(searchTerm))
      .then(() => this.setState({ searchResult: appsFromApi }));
  }

  handleSelectApp(app) {
    const { handleAppData } = this.props;
    this.setState({ selectedApp: { ...app } });
    handleAppData(app);
  }

  render() {
    const { appsFromApi } = this.props;
    const { selectedApp } = this.state;
    return (
      <div className="small-12 column">
        <div className="row small-collapse">
          <div className="small-10 column">
            <Input
              maxLength="150"
              placeholder="App name"
              onChange={this.handleChange}
              fluid
              focus
            />
          </div>
          <div className="small-2 column text-center">
            <Button
              circular
              primary
              icon="search"
              onClick={this.handleSearch}
            />
          </div>
        </div>
        {/* Apps fetched from API List */}
        {(!isEmpty(appsFromApi) && !selectedApp.size > 0) ?
          <Card.Group className="aeg-card-group">
            {Object.keys(appsFromApi).map(index => (
              <Card
                onClick={() => this.handleSelectApp(appsFromApi[index])}
                key={index}
                fluid
              >
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src={appsFromApi[index].icon_72}
                  />
                  <Card.Header>{appsFromApi[index].title}</Card.Header>
                  <Card.Meta>{appsFromApi[index].downloads} downloads</Card.Meta>
                  <Card.Description>{appsFromApi[index].short_desc}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          : null
        }
        {/* App Selected from the list */}
        {this.state.selectedApp.size ?
          <div className="text-center row align-center">
            <span className="small-12 column subheader">App selected</span>
            <div className="small-12 column">
              <img src={this.state.selectedApp.icon_72} alt="" />
            </div>
            <h1 className="aeg-p-color">{this.state.selectedApp.title}</h1>
          </div>
          : null
        }
      </div>
    );
  }
}

IssueAnswerAppSearch.propTypes = {
  fetchAppsFromApi: PropTypes.func.isRequired,
  appsFromApi: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  handleAppData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appsFromApi: get(state, 'answers.appsFromApi.results', []),
});

const mapDispatchToProps = { ...answersActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssueAnswerAppSearch);

