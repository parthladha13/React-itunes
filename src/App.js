import React, { Component } from "react";
import "spectre.css";
import "react-select/dist/react-select.css";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router-dom";
import store, { history } from "./store";
import "./App.css";
// Components
import AuthRoute from "./components/Auth/AuthRoute";
// Scenes
import Home from "./scenes/Home";
import Dashboard from "./scenes/Dashboard";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <div style={{ height: "100%", width: "100%" }}>
            <Route exact path="/" component={Home} />
            <AuthRoute
              path="/dashboard"
              component={Dashboard}
              isAuthenticated
            />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
