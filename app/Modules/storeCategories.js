import fetchStatusHandler from 'Utils/fetchStatusHandler';
import { getCookie } from 'Utils/cookies';

// Actions
const FETCH = 'admin/storeCategories/FETCH';
const ADD_STORE_CATEGORIES = 'admin/storeCategories/ADD_STORE_CATEGORIES';
const ADD_STORE_CATEGORY = 'admin/storeCategories/ADD_STORE_CATEGORY';
const SELECT = 'admin/storeCategories/SELECT';
const CLEAR_SELECT = 'admin/storeCategories/CLEAR_SELECT';
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
        storeCategories: [...state.storeCategories]
          .filter(storeCatery => storeCatery.id !== action.storeCategoryId),
      };
    case SELECT:
      return {
        ...state,
        selectedCategory: [...state.storeCategories]
          .filter(storeCategory => storeCategory.id === action.storeCategoryId)[0],
      };
    case CLEAR_SELECT:
      return {
        ...state,
        selectedCategory: {},
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

export const clearSelected = () => ({
  type: CLEAR_SELECT,
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

export const deleteStoreCategoryAction = id => dispatch => fetch(`${defaultUrl}/store_categories/${id}`, {
  method: 'DELETE',
  headers: {
    ...customHeaders,
  },
}).then(() => {
  dispatch(deleteStoreCategory(id));
  swal(
    'Borrada!',
    'La categoria de tienda ha sido borrada.',
    'success'
  );
})
.catch((error) => { showErrorMsg(error) });

export const updateStoreCategory = (history, values, id) => dispatch => fetch(`${defaultUrl}/store_categories/${id}`, {
  method: 'PUT',
  body: JSON.stringify(values),
  headers: {
    ...customHeaders
  },
}).then(() => {
  swal({
    type: 'success',
    title: 'Categoria de tienda actualizada',
    text: 'En un momento se te redireccionara al listado de categorias de tiendas',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/categoria-de-tiendas');
  }, 1500);
})
.catch((error) => { showErrorMsg(error); })

export const createStoreCategory = (history, values) => dispatch => fetch(`${process.env.API_BASE_URL}/store_categories`, {
  method: "POST",
  body: JSON.stringify(values),
  headers: {
    ...customHeaders
  },
}).then(response => response.json())
.then(data => {
  dispatch(addStoreCategory(data.storeCategory));
  swal({
    type: 'success',
    title: 'Categoria de tienda creada',
    text: 'En un momento se te redireccionara al listado de categorias de tiendas',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/categoria-de-tiendas');
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const getStoreCategories = () => dispatch => fetch(`${defaultUrl}/store_categories`, {
  headers: {
    ...customHeaders
  },
}).then(fetchStatusHandler)
.then(response => response.json())
.then(data => dispatch(addStoreCategories(data.store_categories)))
.catch(error => {
  dispatch(setError('Error al cargar las categorias, recarga la pagina porfavor'));
});