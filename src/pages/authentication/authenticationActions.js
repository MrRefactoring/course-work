import { createActions } from 'redux-actions';

const identity = x => x;

export const authenticationActions = createActions({
  SHOW_LOADER: identity,
  RESET_ERROR: identity,

  SIGN_IN: identity,
  SIGN_IN_SUCCESS: identity,
  SIGN_IN_FAIL: identity,

  SIGN_IN_BY_FACE: identity,
  SIGN_IN_BY_FACE_SUCCESS: identity,
  SIGN_IN_BY_FACE_FAIL: identity,

  SIGN_UP: identity,
  SIGN_UP_SUCCESS: identity,
  SIGN_UP_FAIL: identity,

  LOGOUT: identity
});
