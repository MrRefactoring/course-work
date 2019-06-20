import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import saga from './sagas';
import { applyMiddleware, compose, createStore } from 'redux';

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const createStoreWithMiddleware = compose(
  applyMiddleware(sagaMiddleware)
)(createStore);

const store = createStoreWithMiddleware(reducer, initialState);

sagaMiddleware.run(saga);

export default store;
