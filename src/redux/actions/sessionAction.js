import * as actionTypes from "./actionTypes";

export const sessionActionStatePending = () => {
  type: actionTypes.USER_SESSION_PENDING;
};

export const sessionActionStateError = (error) => {
  type: actionTypes.USER_SESSION_ERROR;
  error: error;
};

export const sessionActionStateSuccess = () => {
  type: actionTypes.USER_SESSION_SUCCESS;
};


