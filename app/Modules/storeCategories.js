import fetchStatusHandler from 'Utils/fetchStatusHandler';

// Actions
const FETCH = 'admin/storeCategories/FETCH';
const ADD = 'admin/storeCategories/ADD';
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

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ADD:
      return {
        ...state,
        storeCategories: [...action.storeCategories],
        isLoading: false,
        error: '',
      };
    case DELETE:
      return {
        ...state,
        storeCategories: [...state.storeCategories]
          .filter(category => category.id !== action.categoryId),
      };
    case SELECT:
      return {
        ...state,
        selectedCategory: state.storeCategories
          .filter(category => category.id === action.categoryId)[0],
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
  type: ADD,
  storeCategories,
});

export const selectStoreCategories = categoryId => ({
  type: SELECT,
  categoryId,
});

export const deleteStoreCategories = categoryId => ({
  type: DELETE,
  categoryId,
});

export const fetchStoreCategories = () => ({
  type: FETCH,
});

export const setError = (error) => ({
  type: ERROR,
  error,
});

// Side effects

export const getStoreCategories = () => dispatch => fetch(`${defaultUrl}/store_categories`)
  .then(fetchStatusHandler)
  .then(response => response.json())
  .then(json => json.store_categories)
  .then(data => dispatch(addStoreCategories(data)))
  .catch(error => { console.log(error); setError('Error al cargar las categorias, recarga la pagina porfavor'); });
