import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import products from './products';
import productCategories from './productCategories';
import stores from './stores';
import storeCategories from './storeCategories';

export default combineReducers({
  products,
  productCategories,
  stores,
  storeCategories,
  form,
});