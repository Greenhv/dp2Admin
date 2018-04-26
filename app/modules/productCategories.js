
// Actions
const FETCH = 'admin/productCategories/FETCH';
const ADD = 'admin/productCategories/ADD';
const SELECT = 'admin/productCategories/SELECT';
const EDIT = 'admin/productCategories/EDIT';
const DELETE = 'admin/productCategories/DELETE';

// Initial State
const initialState = {
  productCategories: [],
  selectedCategory: {},
  isModalOpen: true,
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
        productCategories: [...action.productCategories],
      };
      break;
    case DELETE:
      return {
        ...state,
        productCategories: [...state.productCategories]
          .filter(category => category.id !== action.categoryId),
      };
    case SELECT:
      return {
        ...state,
        selectedCategory: state.productCategories
          .filter(category => category.id === action.categoryId)[0],
      };
      break;
    default:
      return state;
      break;
  }
};

// Action Creators

export const addProductCategories = productCategories => ({
  type: ADD,
  productCategories,
});

export const selectProductCategories = categoryId => ({
  type: SELECT,
  categoryId,
});

export const deleteProductCategories = categoryId => ({
  type: DELETE,
  categoryId,
});

export const fetchProductCategories = () => {
  getProductCategories();

  return {
    type: FETCH,
  };
}

// Side effects

const getProductCategories = () => dispatch => fetch('someurl')
  .then(response => response.data)
  .then(data => dispatch(addProductCategories(data)))
  .catch(error => { console.log(error); });
