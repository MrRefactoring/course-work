import { authenticationSagas } from 'pages/authentication/authenticationSagas';
import { messagesSagas } from 'pages/messages/messagesSagas';
import { takeLatest } from 'redux-saga/effects';

function* takeLatestGenerator(sagas) {
  for (const [actionType, saga] of Object.entries(sagas)) {
    yield takeLatest(actionType, saga);
  }
}

export default function* () {
  yield* takeLatestGenerator(authenticationSagas);
  yield* takeLatestGenerator(messagesSagas);
}
