import fetchStatusHandler from 'Utils/fetchStatusHandler';
const FETCH = 'admin/promotions/FETCH';
const ADD_PROMOTIONS = 'admin/promotions/ADD_PROMOTIONS';
const ADD_PROMOTION = 'admin/promotions/ADD_PROMOTION';
const SELECT = 'admin/promotions/SELECT';
const EDIT = 'admin/promotions/EDIT';
const DELETE = 'admin/promotions/DELETE';
const ERROR = 'admin/promotions/ERROR';

const initialState = {
    promotions: [],
    selectedPromotion: {},
    isLoading: false,
    error: '',
    isModalOpen: true,
}

// Reducer

const defaultUrl = process.env.API_BASE_URL;
const auth = process.env.DEFAULT_ACCSS_TOKEN;
const customHeaders = {
    'Authorization': auth,
    'content-type': 'application/json',
}




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
          promotions: [...action.promotions],
          isLoading: false,
          error: '',
        };
      case ADD_PRODUCT:
        return {
          ...state,
          promotions: [...state.promotions, action.promotion],
          error: '',
        };
      case DELETE:
        return {
          ...state,
          promotions: [...state.promotions]
            .filter(promotion => promotion.id !== action.promotionId),
        };
      case SELECT:
        return {
          ...state,
          selectedPromotion: state.promotions
            .filter(promotion => promotion.id === action.promotionId)[0],
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



export const addPromotions = promotions => ({
    type: ADD_PROMOTIONS,
    products,
  });
  
  export const addPromotion = promotion => ({
    type: ADD_PROMOTION,
    product,
  })
  
  export const selectedPromotion = promotionId => ({
    type: SELECT,
    productId,
  });
  
  export const deletePromotion = promotionId => ({
    type: DELETE,
    promotionId,
  });
  
  export const fetchPromotions = () => ({
    type: FETCH,
  });
  
  export const setError = (error) => ({
    type: ERROR,
    error,
  });

  export const createPromotion = (history, values) => dispatch => fetch(`${defaultUrl}/promotions`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      ...customHeaders
    },
  }).then(response => response.json())
  .then((data) => {
    dispatch(addPromotion(data.promotion));
    history.push('/promotion');
  });
  
  export const getPromotions = () => dispatch => fetch(`${defaultUrl}/promotions`, {
    headers: {
      ...customHeaders
    },
  })
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => dispatch(addPromotions(data.promotions)))
    .catch(error => { dispatch(setError('Error al cargar las promotciones, recarga la pagina porfavor')); });
  