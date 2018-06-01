import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Modules';

let middelwares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middelwares = [...middelwares, logger];
}

export default () => {
  return createStore(
    rootReducer,
    applyMiddleware(...middelwares)
  );
};