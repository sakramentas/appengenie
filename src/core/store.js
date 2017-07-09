import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (initialState = {}) => {
  // Redux Logger
  const logger = createLogger();

  // Define Middlewares
  let middleware = applyMiddleware(thunk, logger);

  // Activate Redux Devtools when on dev environment
  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension; // eslint-disable-line
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  // Create Store
  const store = createStore(reducers, initialState, middleware);

  // Activate hot loader for reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers.default);
    });
  }

  return store;
};
