import { handleActions } from 'redux-actions';

const initialState = {
  token: localStorage.getItem('token') || '',
  loader: false,
  errorMessage: undefined
};

const loginStateHandler = (state, { payload: { token } }) => {
  localStorage.setItem('token', token);
  return Object.assign({}, state, { token, loader: false });
};

const showError = (state, { payload: { errorMessage } }) => Object.assign({}, state, { loader: false, errorMessage });

export const authenticationReducers = handleActions({
  SHOW_LOADER: state => Object.assign({}, state, { loader: true }),
  RESET_ERROR: state => Object.assign({}, state, { errorMessage: undefined }),

  SIGN_IN_SUCCESS: loginStateHandler,
  SIGN_IN_FAIL: showError,

  SIGN_IN_BY_FACE_SUCCESS: loginStateHandler,
  SIGN_IN_BY_FACE_FAIL: showError,

  SIGN_UP_SUCCESS: loginStateHandler,
  SIGN_UP_FAIL: showError,

  LOGOUT: state => Object.assign({}, state, { token: '' })
}, initialState);
