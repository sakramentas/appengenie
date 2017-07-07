import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {MuiThemeProvider, muiTheme} from './providers/mui';
import {initAuth} from './core/auth';
import configureStore from './core/store';
import Root from './views/root';
import './views/styles/styles.scss';

const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');


const render = (Root) => {
	ReactDOM.render(
		<AppContainer>
			<MuiThemeProvider muiTheme={muiTheme}>
				<Root
					history={syncedHistory}
					store={store}
				/>
			</MuiThemeProvider>
		</AppContainer>,
		rootElement
	);
};

if (module.hot) {
	module.hot.accept('./views/root', () => {
		render(require('./views/root').default);
	});
}

// Init Firebase Authentication
initAuth(store.dispatch)
	.then(() => render(Root))
	.catch(error => console.error(error)); // eslint-disable-line no-console
