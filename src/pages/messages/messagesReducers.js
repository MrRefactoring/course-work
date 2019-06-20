import { handleActions } from 'redux-actions';

const initialState = {
  persons: [],
  chats: [],
  messages: []
};

export const messagesReducers = handleActions({
  FIND_PERSON_SUCCESS: (state, { payload: { persons } }) => Object.assign({}, state, { persons }),
  FIND_PERSON_FAIL: state => Object.assign({}, state, { persons: [] }),

  GET_CHATS_SUCCESS: (state, { payload: { chats } }) => Object.assign({}, state, { chats }),
  GET_CHATS_FAIL: state => state,

  GET_MESSAGES_SUCCESS: (state, { payload: { messages } }) => Object.assign({}, state, { messages }),
  GET_MESSAGES_FAIL: state => Object.assign({}, state, { messages: [] })
}, initialState);
