import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Modules';

export default () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
};