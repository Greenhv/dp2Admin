import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import products from './products';
import productCategories from './productCategories';
import stores from './stores';
import storeCategories from './storeCategories';
import brands from './brands';
import roles from './roles';
import events from './events';
import users from './users';

export default combineReducers({
  products,
  productCategories,
  stores,
  storeCategories,
  brands,
  roles,
  events,
  users,
  form, // This should be always the last item
});