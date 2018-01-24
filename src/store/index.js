import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import persistState from "redux-localstorage";

import { routerReducer, routerMiddleware } from "react-router-redux";

import reducers from "./reducers";
// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history), logger];

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        {
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }
      )
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  persistState(/*paths, config*/)
);

const appReducer = combineReducers({
  ...reducers,
  router: routerReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};
/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, {}, enhancer);
/* eslint-enable */

export default store;
