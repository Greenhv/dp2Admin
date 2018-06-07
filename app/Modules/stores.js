import fetchStatusHandler from 'Utils/fetchStatusHandler';
import { getCookie } from 'Utils/cookies';

// Actions
const FETCH = 'admin/stores/FETCH';
const ADD_STORES = 'admin/stores/ADD_STORES';
const ADD_STORE = 'admin/stores/ADD_STORE';
const SELECT = 'admin/stores/SELECT';
const CLEAR_SELECT = 'admin/stores/CLEAR_SELECT';
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
const auth = getCookie('authToken');
const customHeaders = {
  'Authorization': auth.authToken,
  'content-type': 'application/json',
};

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
        stores: [...state.stores]
          .filter(store => store.id !== action.storeId),
      };
    case SELECT:
      return {
        ...state,
        selectedStore: state.stores
          .filter(store => store.id === action.storeId)[0],
      };
    case CLEAR_SELECT:
      return {
        ...state,
        selectedStore: {},
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

export const clearSelected = () => ({
  type: CLEAR_SELECT,
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

const showErrorMsg = (error) => {
  console.log(error);
  swal({
    type: 'error',
    title: 'Ocurrio un error',
    text: 'Por favor vuelve a intentarlo en unos segundos',
    showConfirmButton: false,
    timer: 1500,
  });
};

export const deleteStoreAction = id => dispatch => fetch(`${defaultUrl}/stores/${id}`, {
  method: 'DELETE',
  headers: {
    ...customHeaders,
  },
}).then(() => {
  swal(
    'Borrada!',
    'La tienda ha sido borrada.',
    'success'
  );
  dispatch(deleteStore(id));
})
.catch((error) => { showErrorMsg(error) });

export const updateStore = (history, values, id) => dispatch => fetch(`${defaultUrl}/stores/${id}`, {
  method: 'PUT',
  body: JSON.stringify(values),
  headers: {
    ...customHeaders
  },
}).then(() => {
  swal({
    type: 'success',
    title: 'Tienda Actualizada',
    text: 'En un momento se te redireccionara al listado de tiendas',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/tiendas');
  }, 1500);
})
.catch((error) => { showErrorMsg(error); })

export const createStore = (history, values) => dispatch => fetch(`${process.env.API_BASE_URL}/stores`, {
  method: "POST",
  body: JSON.stringify(values),
  headers: {
    ...customHeaders
  },
}).then(response => response.json())
.then(data => {
  dispatch(addStore(data.store));
  swal({
    type: 'success',
    title: 'Tienda creada',
    text: 'En un momento se te redireccionara al listado de tiendas',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/tiendas')
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const getStores = () => dispatch => fetch(`${defaultUrl}/stores`, {
  headers: {
    ...customHeaders
  },
}).then(fetchStatusHandler)
.then(response => response.json())
.then(data => dispatch(addStores(data.stores)))
.catch(error => {
  console.log(error);
  console.log('Error al cargar las tiendas, recarga la pagina porfavor');
});