import { messagesActions as actions } from './messagesActions';
import { call, put } from 'redux-saga/effects';
import * as api from 'api';

export const messagesSagas = {
  * FIND_PERSON({ payload }) {
    try {
      const response = yield call(api.findPerson, payload);

      yield put(actions.findPersonSuccess({ persons: response.data }));
    } catch (e) {
      yield put(actions.findPersonFail());
    }
  },

  * ADD_CHAT({ payload }) {
    try {
      yield call(api.addChat, payload);

      const chats = yield call(api.getChats);

      yield put(actions.getChatsSuccess({ chats: chats.data }));
    } catch (e) {
      yield put(actions.getChatsFail());
    }
  },

  * ADD_MESSAGE({ payload }) {
    try {
      yield call(api.addMessage, payload);
      yield put(actions.addMessageSuccess());
    } catch (e) {
      yield put(actions.addMessageFail());
    }
  },

  * REMOVE_CHAT({ payload }) {
    try {
      yield call(api.removeChat, payload);

      const chats = yield call(api.getChats);

      yield put(actions.getChatsSuccess({ chats: chats.data }));
    } catch (e) {
      yield put(actions.getChatsFail());
    }
  },

  * EDIT_MESSAGE({ payload }) {
    yield call(api.editMessage, payload);
  },

  * GET_CHATS() {
    try {
      const response = yield call(api.getChats);

      yield put(actions.getChatsSuccess({ chats: response.data }));
    } catch (e) {
      yield put(actions.getChatsFail());
    }
  },

  * GET_MESSAGES({ payload }) {
    try {
      const response = (yield call(api.getMessages, payload)).data;
      const messages = response.messages.map(el => ({ messageId: el._id, message: el.message, your: el.your }));

      yield put(actions.getMessagesSuccess({ chatId: response.chatId, messages }));
    } catch (e) {
      yield put(actions.getMessagesFail());
    }
  }
};
