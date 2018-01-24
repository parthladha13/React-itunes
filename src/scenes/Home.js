import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { push } from "react-router-redux";
import FacebookLogin from "react-facebook-login";
import styled from "styled-components";
import { FBAppId } from "./../utils";
import { authenticate } from "./../store/actions/user";
import iTunes from "./../iTunes.svg";
import background from "./../concert.jpeg";

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
`;
class Home extends React.Component {
  componentDidMount() {
    try {
      const fbData = JSON.parse(localStorage.getItem("@App:user"));
      if (fbData && !this.props.user.isAuthenticated) {
        this.props.login(fbData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isAuthenticated) {
      this.props.changeUrl("/dashboard");
    }
  }

  _responseFacebook = response => this.props.login(response);

  render() {
    return (
      <CenteredDiv>
        <img
          src={iTunes}
          alt="iTunes App"
          style={{ paddingBottom: "30px", marginTop: "-30px" }}
        />
        <FacebookLogin
          appId={FBAppId}
          fields="name,email"
          callback={this._responseFacebook}
          size="small"
          autoLoad={false}
        />
      </CenteredDiv>
    );
  }
}

Home.propTypes = {
  login: PropTypes.func.isRequired
};

const mapPropsToState = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(authenticate(user)),
  changeUrl: url => dispatch(push(url))
});

const withConnect = connect(mapPropsToState, mapDispatchToProps);

export default compose(withConnect)(Home);
