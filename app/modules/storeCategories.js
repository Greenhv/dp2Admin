// Actions
const FETCH = 'admin/storeCategories/FETCH';
const ADD = 'admin/storeCategories/ADD';
const SELECT = 'admin/storeCategories/SELECT';
const EDIT = 'admin/storeCategories/EDIT';
const DELETE = 'admin/storeCategories/DELETE';

// Initial State
const initialState = {
  storeCategories: [],
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
        storeCategories: [...action.storeCategories],
      };
      break;
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
      break;
    default:
      return state;
      break;
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

export const fetchStoreCategories = () => {
  getStoreCategories();

  return {
    type: FETCH,
  };
}

// Side effects

const getStoreCategories = () => dispatch => fetch('someurl')
  .then(response => response.data)
  .then(data => dispatch(addStoreCategories(data)))
  .catch(error => { console.log(error); });
