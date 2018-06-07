import fetchStatusHandler from 'Utils/fetchStatusHandler';
import { getCookie } from 'Utils/cookies';

// Actions
const FETCH = 'admin/products/FETCH';
const ADD_PRODUCTS = 'admin/products/ADD_PRODUCTS';
const ADD_PRODUCT = 'admin/products/ADD_PRODUCT';
const SELECT = 'admin/products/SELECT';
const EDIT = 'admin/products/EDIT';
const DELETE = 'admin/products/DELETE';
const ERROR = 'admin/products/ERROR';
const CLEAR_SELECTED = 'admin/products/CLEAR_SELECTED';

// Initial State
const initialState = {
  products: [],
  selectedProduct: {},
  isLoading: false,
  error: '',
  isModalOpen: true,
};

// Reducer

const defaultUrl = process.env.API_BASE_URL;
const auth = getCookie('authToken');
const customHeaders = {
  'Authorization': auth ? auth.authToken : '',
  'content-type': 'application/json',
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
        isLoading: false,
        error: '',
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
        error: '',
      };
    case DELETE:
      return {
        ...state,
        products: [...state.products]
          .filter(product => product.id !== action.productId),
      };
    case SELECT:
      return {
        ...state,
        selectedProduct: state.products
          .filter(product => product.id === action.productId)[0],
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        selectedProduct: {},
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

export const addProducts = products => ({
  type: ADD_PRODUCTS,
  products,
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

export const selectProduct = productId => ({
  type: SELECT,
  productId,
});

export const deleteProduct = productId => ({
  type: DELETE,
  productId,
});

export const fetchProducts = () => ({
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
}

export const deleteProductAction = id => dispatch => fetch(`${defaultUrl}/products/${id}`, {
  method: 'DELETE',
  headers: {
    ...customHeaders,
  },
}).then(() => {
  swal(
    'Borrado!',
    'El producto ha sido borrado.',
    'success'
  )
  dispatch(deleteProduct(id));
})
.catch((error) => { showErrorMsg(error) });

export const updateProduct = (history, values, id) => dispatch => fetch(`${defaultUrl}/products/${id}`, {
  method: 'PUT',
  body: JSON.stringify(values),
  headers: {
    ...customHeaders,
  },
}).then(() => {
  swal({
    type: 'success',
    title: 'Producto actualizado',
    text: 'En un momento se te redireccionara al listado de productos',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/productos');
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const createProduct = (history, values) => dispatch => fetch(`${defaultUrl}/products`, {
  method: 'POST',
  body: JSON.stringify(values),
  headers: {
    ...customHeaders
  },
}).then(response => response.json())
.then((data) => {
  dispatch(addProduct(data.product));
  swal({
    type: 'success',
    title: 'Producto creado',
    text: 'En un momento se te redireccionara al listado de productos',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/productos');
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const getProducts = () => dispatch => fetch(`${defaultUrl}/products`, {
  headers: {
    ...customHeaders
  },
}).then(fetchStatusHandler)
.then(response => response.json())
.then(data => dispatch(addProducts(data.products)))
.catch(error => { dispatch(setError('Error al cargar los productos, recarga la pagina porfavor')); });
