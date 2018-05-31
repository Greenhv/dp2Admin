import fetchStatusHandler from 'Utils/fetchStatusHandler';

// Actions
const FETCH = 'admin/stores/FETCH';
const ADD_STORES = 'admin/stores/ADD_STORES';
const ADD_STORE = 'admin/stores/ADD_STORE';
const SELECT = 'admin/stores/SELECT';
const EDIT = 'admin/stores/EDIT';
const DELETE = 'admin/stores/DELETE';
const ERROR = 'admin/stores/ERROR';

// Initial State
const initialState = {
  stores: [],
  selectedStore: {},
  isLoading: false,
  error: '',
  isModalOpen: true,
};

// Reducer

const defaultUrl = process.env.API_BASE_URL;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_STORES:
      return {
        ...state,
        stores: [...action.stores],
        isLoading: false,
        error: '',
      };
    case ADD_STORE:
      return {
        ...state,
        stores: [...state.stores, action.store],
        isLoading: false,
        error: '',
      };
    case DELETE:
      return {
        ...state,
        stores: [...state.stores, ...state.stores]
          .filter(store => store.id !== action.storeId),
      };
    case SELECT:
      return {
        ...state,
        selectedStore: state.stores
          .filter(store => store.id === action.storeId)[0],
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

export const addStores = stores => ({
  type: ADD_STORES,
  stores,
});

export const addStore = store => ({
  type: ADD_STORE,
  store,
})

export const selectStore = storeId => ({
  type: SELECT,
  storeId,
});

export const deleteStore = storeId => ({
  type: DELETE,
  storeId,
});

export const fetchStores = () => ({
  type: FETCH,
});

export const setError = (error) => ({
  type: ERROR,
  error,
});

// Side effects

export const getStores = () => dispatch => fetch(`${defaultUrl}stores`)
  .then(fetchStatusHandler)
  .then(response => response.json())
  .then(data => dispatch(addStores(data.stores)))
  .catch(error => {
    console.log(error);
    console.log('Error al cargar las tiendas, recarga la pagina porfavor');
  });