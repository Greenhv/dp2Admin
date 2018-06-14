import fetchStatusHandler from 'Utils/fetchStatusHandler';
import {
  getCookie
} from 'Utils/cookies';

const FETCH = 'admin/promotions/FETCH';
const ADD_PROMOTIONS = 'admin/promotions/ADD_PROMOTIONS';
const ADD_PROMOTION = 'admin/promotions/ADD_PROMOTION';
const SELECT = 'admin/promotions/SELECT';
const EDIT = 'admin/promotions/EDIT';
const DELETE = 'admin/promotions/DELETE';
const ERROR = 'admin/promotions/ERROR';
const CLEAR_SELECTED = 'admin/promotions/CLEAR_SELECTED'

const initialState = {
  promotions: [],
  selectedPromotion: {},
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
    case ADD_PROMOTIONS:
      return {
        ...state,
        promotions: [...action.promotions],
        isLoading: false,
        error: '',
      };
    case ADD_PROMOTION:
      return {
        ...state,
        promotions: [...state.promotions, action.promotion],
        isLoading: false,
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
    case CLEAR_SELECTED:
      return {
        ...state,
        selectedPromotion: {},
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
  promotions,
});

export const addPromotion = promotion => ({
  type: ADD_PROMOTION,
  promotion,
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

export const selectPromotion = promotionId => ({
  type: SELECT,
  promotionId,
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

const showErrorMsg = (error) => {
  console.log(error);
  swal({
    type: 'error',
    title: 'Ocurrio un error',
    text: 'Por favor vuelve a intentarlo en unos segundos',
    showConfirmButton: false,
    timer: 1500,
  })
}

export const deletePromotionAction = id => dispatch => fetch(`${defaultUrl}/promotions/${id}`, {
    method: 'DELETE',
    headers: {
      ...customHeaders,
    },
  }).then(() => {
    swal(
      'Borrado!',
      'La promoción ha sido borrado.',
      'success'
    )
    dispatch(deletePromotion(id));
  })
  .catch((error) => {
    showErrorMsg(error)
  });

export const updatePromotion = (history, values, id) => dispatch => fetch(`${defaultUrl}/promotions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      ...customHeaders,
    },
  }).then(() => {
    swal({
      type: 'success',
      title: 'Promocion actualizada',
      text: 'En un momento se te redireccionara al listado de promociones',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      history.push('/promociones');
    }, 1500);
  })
  .catch((error) => {
    showErrorMsg(error)
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
    swal({
      type: 'success',
      title: 'Promocion creada',
      text: 'En un momento se te redireccionara al listado de promociones',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      history.push('/promociones');
    }, 1500);
  }).catch((error) => {
    showErrorMsg(error)
  });

export const getPromotions = () => dispatch => fetch(`${defaultUrl}/promotions/all_promotions`, {
    headers: {
      ...customHeaders
    },
  })
  .then(fetchStatusHandler)
  .then(response => response.json())
  .then(data => dispatch(addPromotions(data.promotions)))
  .catch(error => {
    dispatch(setError('Error al cargar las promociones, recarga la pagina porfavor'));
  });
