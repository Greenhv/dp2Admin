import fetchStatusHandler from 'Utils/fetchStatusHandler';
import { getCookie } from 'Utils/cookies';

// Actions
const FETCH = 'admin/storeCategories/FETCH';
const ADD_STORE_CATEGORIES = 'admin/storeCategories/ADD_STORE_CATEGORIES';
const ADD_STORE_CATEGORY = 'admin/storeCategories/ADD_STORE_CATEGORY';
const SELECT = 'admin/storeCategories/SELECT';
const EDIT = 'admin/storeCategories/EDIT';
const DELETE = 'admin/storeCategories/DELETE';
const ERROR = 'admin/storeCategories/ERROR';

// Initial State
const initialState = {
  storeCategories: [],
  selectedCategory: {},
  isLoading: false,
  error: '',
  isModalOpen: true,
};

// Reducer

const defaultUrl = process.env.API_BASE_URL;
const auth = getCookie('authToken');
const customHeaders = {
  'Authorization': auth,
  'content-type': 'application/json',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_STORE_CATEGORIES:
      return {
        ...state,
        storeCategories: [...action.storeCategories],
        isLoading: false,
        error: '',
      };
    case ADD_STORE_CATEGORY:
      return {
        ...state,
        storeCategories: [...state.storeCategories, action.storeCategory],
        isLoading: false,
        error: '',
      };
    case DELETE:
      return {
        ...state,
        storeCategories: [...state.storeCategories, ...state.storeCategories]
          .filter(storeCatery => storeCatery.id !== action.storeCatery),
      };
    case SELECT:
      return {
        ...state,
        selectedStoreCategory: state.storeCategories
          .filter(storeCategory => storeCategory.id === action.storeCategoryId)[0],
      };
    case ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

// Action Creators

export const addStoreCategories = storeCategories => ({
  type: ADD_STORE_CATEGORIES,
  storeCategories,
});

export const addStoreCategory = storeCategory => ({
  type: ADD_STORE_CATEGORY,
  storeCategory,
});

export const selectStoreCategory = storeCategoryId => ({
  type: SELECT,
  storeCategoryId,
});

export const deleteStoreCategory = storeCategoryId => ({
  type: DELETE,
  storeCategoryId,
});

export const fetchStoreCategories = () => ({
  type: FETCH,
});

export const setError = (error) => ({
  type: ERROR,
  error,
});

// Side effects

export const createStoreCategory = (history, values) => dispatch => fetch(`${process.env.API_BASE_URL}/store-categories`, {
  method: "POST",
  body: JSON.stringify(values),
  headers: {
    ...customHeaders
  }
}).then(response => response.json())
  .then(data => {
    dispatch(addStoreCategory(data.storeCategory));
    history.push('/categoria-de-tiendas');
  });

export const getStoreCategories = () => dispatch => fetch(`${defaultUrl}/store_categories`, {
  headers: {
    ...customHeaders
  },
}).then(fetchStatusHandler)
  .then(response => response.json())
  .then(data => dispatch(addStoreCategories(data.store_categories)))
  .catch(error => {
    console.log(error);
    dispatch(setError('Error al cargar las categorias, recarga la pagina porfavor'));
  });