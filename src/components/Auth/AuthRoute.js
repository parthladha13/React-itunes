import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/" />}
  />
);

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.any
};

const mapPropsToState = state => ({
  isAuthenticated: state.user.isAuthenticated
});

const withConnect = connect(mapPropsToState, null);

export default compose(withConnect)(AuthRoute);
