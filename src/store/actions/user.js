import {
  FETCHING_USER_PENDING,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILED,
  LOGOUT
} from "./../constants";

export const authenticate = response => {
  console.log(response);
  return dispatch => {
    dispatch(getUser());
    try {
      localStorage.setItem("@App:user", JSON.stringify(response));
      dispatch(getUserSuccess(response));
    } catch (error) {
      dispatch(getUserFailure());
    }
  };
};

export const signout = () => {
  console.log("Working");
  return dispatch => dispatch(logout());
};

function getUser() {
  return {
    type: FETCHING_USER_PENDING
  };
}

function getUserSuccess(data) {
  return {
    type: FETCHING_USER_SUCCESS,
    data
  };
}

function getUserFailure() {
  return {
    type: FETCHING_USER_FAILED
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}
