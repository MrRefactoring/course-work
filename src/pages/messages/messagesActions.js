import { createActions } from 'redux-actions';

const identity = x => x;

export const messagesActions = createActions({
  FIND_PERSON: identity,
  FIND_PERSON_SUCCESS: identity,
  FIND_PERSON_FAIL: identity,

  ADD_CHAT: identity,
  REMOVE_CHAT: identity,

  ADD_MESSAGE: identity,
  ADD_MESSAGE_SUCCESS: identity,
  ADD_MESSAGE_FAIL: identity,

  EDIT_MESSAGE: identity,

  GET_CHATS: identity,
  GET_CHATS_SUCCESS: identity,
  GET_CHATS_FAIL: identity,

  GET_MESSAGES: identity,
  GET_MESSAGES_SUCCESS: identity,
  GET_MESSAGES_FAIL: identity
});
