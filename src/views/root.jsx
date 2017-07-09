import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { getRoutes } from './routes';


const Root = ({ history, store }) => (
  <Provider store={store}>
    <Router
      history={history}
      routes={getRoutes(store.getState)}
    />
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
