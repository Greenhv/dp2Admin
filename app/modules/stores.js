// Actions
const FETCH = 'admin/stores/FETCH';
const ADD = 'admin/stores/ADD';
const SELECT = 'admin/stores/SELECT';
const EDIT = 'admin/stores/EDIT';
const DELETE = 'admin/stores/DELETE';

// Initial State
const initialState = {
  stores: [],
  selectedStore: {},
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
        stores: [...action.stores],
      };
      break;
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
      break;
    default:
      return state;
      break;
  }
};

// Action Creators

export const addStores = stores => ({
  type: ADD,
  stores,
});

export const selectStore = storeId => ({
  type: SELECT,
  storeId,
});

export const deleteStore = storeId => ({
  type: DELETE,
  storeId,
});

export const fetchStores = () => {
  getStores();

  return {
    type: FETCH,
  };
}

// Side effects

const getStores = () => dispatch => fetch('someurl')
  .then(response => response.data)
  .then(data => dispatch(addStores(data)))
  .catch(error => { console.log(error); });
