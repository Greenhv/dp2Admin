import fetchStatusHandler from 'Utils/fetchStatusHandler';

// Actions
const FETCH = 'admin/productCategories/FETCH';
const ADD_PRODUCT_CATEGORIES = 'admin/productCategories/ADD_PRODUCT_CATEGORIES';
const ADD_PRODUCT_CATEGORY = 'admin/productCategories/ADD_PRODUCT_CATEGORY';
const SELECT = 'admin/productCategories/SELECT';
const EDIT = 'admin/productCategories/EDIT';
const DELETE = 'admin/productCategories/DELETE';
const ERROR = 'admin/productCategories/ERROR';

// Initial State
const initialState = {
  productCategories: [],
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
    case ADD_PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategories: [...action.productCategories],
        isLoading: false,
        error: '',
      };
    case ADD_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategories: [...state.productCategories, action.productCategory],
        isLoading: false,
        error: '',
      };
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

export const addProductCategories = productCategories => ({
  type: ADD_PRODUCT_CATEGORIES,
  productCategories,
});

export const addProductCategory = productCategory => ({
  type: ADD_PRODUCT_CATEGORY,
  productCategory,
});

export const selectProductCategories = categoryId => ({
  type: SELECT,
  categoryId,
});

export const deleteProductCategories = categoryId => ({
  type: DELETE,
  categoryId,
});

export const fetchProductCategories = () => ({
  type: FETCH,
});

export const setError = (error) => ({
  type: ERROR,
  error,
});

// Side effects

export const getProductCategories = () => dispatch => fetch(`${defaultUrl}/product_categories`)
  .then(fetchStatusHandler)
  .then(response => response.json())
  .then(data => dispatch(addProductCategories(data.product_category)))
  .catch(error => { dispatch(setError('Error al cargar las categorias, recarga la pagina porfavor')); });
