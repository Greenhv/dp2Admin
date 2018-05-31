import fetchStatusHandler from 'Utils/fetchStatusHandler';

// Actions
const FETCH = 'admin/products/FETCH';
const ADD_PRODUCTS = 'admin/products/ADD_PRODUCTS';
const ADD_PRODUCT = 'admin/products/ADD_PRODUCT';
const SELECT = 'admin/products/SELECT';
const EDIT = 'admin/products/EDIT';
const DELETE = 'admin/products/DELETE';
const ERROR = 'admin/products/ERROR';

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
})

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

export const getProducts = () => dispatch => fetch(`${defaultUrl}products?store_id=2`)
  .then(fetchStatusHandler)
  .then(response => response.json())
  .then(data => dispatch(addProducts(data.products)))
  .catch(error => { dispatch(setError('Error al cargar los productos, recarga la pagina porfavor')); });
