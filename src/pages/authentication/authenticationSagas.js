import { authenticationActions as actions } from './authenticationActions';
import { call, put } from 'redux-saga/effects';
import * as api from 'api';

export const authenticationSagas = {
  * SIGN_IN({ payload }) {
    try {
      yield put(actions.showLoader());
      const response = yield call(api.signIn, payload);
      const { token } = response.data;

      yield put(actions.signInSuccess({ token }));
    } catch (e) {
      let errorMessage = '';

      const errorCode = e.response ? (e.response.status || 500) : 500;

      switch (errorCode) {
        case 401:
          errorMessage = 'Неверный email или пароль';
          break;
        default:
          errorMessage = 'Внутренняя ошибка сервера, попытайтесь позже';
          break;
      }

      yield put(actions.signInFail({ errorMessage }));
    }
  },

  * SIGN_IN_BY_FACE({ payload }) {
    try {
      yield put(actions.showLoader());
      const response = yield call(api.signInbyFace, payload);
      const { token } = response.data;

      yield put(actions.signInByFaceSuccess({ token }));
    } catch (e) {
      let errorMessage = '';

      const errorCode = e.response ? (e.response.status || 500) : 500;

      switch (errorCode) {
        case 400:
          errorMessage = 'Много лиц в камере';
          break;
        case 401:
          errorMessage = 'Лицо не распознано';
          break;
        case 404:
          errorMessage = 'Модуль распознавания лица отключен';
          break;
        default:
          errorMessage = 'Ошибка сервера';
          break;
      }

      yield put(actions.signInByFaceFail({ errorMessage }));
    }
  },

  * SIGN_UP({ payload }) {
    try {
      yield put(actions.showLoader());
      const response = yield call(api.signUp, payload);
      const { token } = response.data;

      yield put(actions.signUpSuccess({ token }));
    } catch (e) {
      let errorMessage = '';

      const errorCode = e.response ? (e.response.status || 500) : 500;

      switch (errorCode) {
        case 409:
          errorMessage = 'Пользователь с таким email уже зарегистрирован';
          break;
        default:
          errorMessage = 'Внутренняя ошибка сервера, попытайтесь позже';
          break;
      }

      yield put(actions.signUpFail({ errorMessage }));
    }
  }
};
