// Actions
const FETCH = 'admin/products/FETCH';
const ADD = 'admin/products/ADD';
const SELECT = 'admin/products/SELECT';

// Initial State
const initialState = {
  products: [],
  selectedProduct: {},
};

// Reducer

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case FETCH:
      return state;
      break;
    case ADD:
      return {
        ...state,
        products: [...actions.products],
      };
      break;
    case SELECT:
      return {
        ...state,
        selectedProduct: state.products
          .filter(product => product.id === action.productId)[0],
      };
      break;
    default:
      return state;
      break;
  }
};

// Action Creators

export const addProducts = products => ({
  type: ADD,
  products,
});

export const selectProduct = productId => ({
  type: SELECT,
  productId,
});

export const fetchProducts = () => {
  getProducts();

  return {
    type: FETCH,
  };
}

// Side effects

const getProducts = () => dispatch => fetch('someurl')
  .then(response => response.data)
  .then(data => dispatch(addProducts(data)))
  .catch(error => { console.log(error); });
