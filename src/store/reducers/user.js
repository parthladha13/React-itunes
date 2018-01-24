import {
  FETCHING_USER_PENDING,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILED,
  LOGOUT
} from "./../constants";

const initialState = {
  isFetching: false,
  error: false,
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        token: action.data,
        isFetching: false,
        isAuthenticated: true,
        ...action.data
      };
    case FETCHING_USER_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case LOGOUT:
      return state;
    default:
      return state;
  }
};
