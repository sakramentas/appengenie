import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { MuiThemeProvider, muiTheme } from './providers/mui';
import { initAuth } from './core/auth';
import configureStore from './core/store';
import Root from './views/root';
import './views/styles/styles.scss';

const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root'); // eslint-disable-line

// Renders App Container to the DOM
const render = RootPage => (
  ReactDOM.render( // eslint-disable-line
    <AppContainer>
      <MuiThemeProvider muiTheme={muiTheme}>
        <RootPage
          history={syncedHistory}
          store={store}
        />
      </MuiThemeProvider>
    </AppContainer>,
    rootElement,
  )
);

// Enables React Hot loader on Root children
if (module.hot) {
  module.hot.accept('./views/root', () => render(Root.default));
}

// Init Firebase Authentication
initAuth(store.dispatch)
  .then(() => render(Root))
  .catch(error => console.error(error)); // eslint-disable-line no-console
