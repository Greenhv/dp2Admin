import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './modules';

export default () => {
  return createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
  );
};