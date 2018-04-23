import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import products from './products';

export default combineReducers({
  products,
  form,
});