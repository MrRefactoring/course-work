import { authenticationReducers } from 'pages/authentication/authenticationReducers';
import { combineReducers } from 'redux';
import { messagesReducers } from 'pages/messages/messagesReducers';

export default combineReducers({
  authentication: authenticationReducers,
  messages: messagesReducers
});
