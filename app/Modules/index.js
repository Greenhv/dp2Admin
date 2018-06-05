import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import products from './products';
import productCategories from './productCategories';
import stores from './stores';
import storeCategories from './storeCategories';
import roles from './roles';

export default combineReducers({
  products,
  productCategories,
  stores,
  storeCategories,
  roles,
  form, // This should be always the last item
});