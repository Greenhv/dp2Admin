import fetchStatusHandler from 'Utils/fetchStatusHandler';
import { getCookie } from 'Utils/cookies';

// Actions
const FETCH = 'admin/events/FETCH';
const ADD_EVENTS = 'admin/events/ADD_EVENTS';
const ADD_EVENT = 'admin/events/ADD_EVENT';
const SELECT = 'admin/events/SELECT';
const EDIT = 'admin/events/EDIT';
const DELETE = 'admin/events/DELETE';
const ERROR = 'admin/events/ERROR';
const CLEAR_SELECTED = 'admin/events/CLEAR_SELECTED';

// Initial State
const initialState = {
  events: [],
  selectedEvent: {},
  isLoading: false,
  error: '',
  isModalOpen: true,
};

// Reducer

const defaultUrl = process.env.API_BASE_URL;
const auth = getCookie('authToken');
const customHeaders = {
  'Authorization': auth.authToken,
  'content-type': 'application/json',
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_EVENTS:
      return {
        ...state,
        events: [...action.events],
        isLoading: false,
        error: '',
      };
    case ADD_EVENT:
      return {
        ...state,
        event: [...state.event, action.event],
        isLoading: false,
        error: '',
      };
    case DELETE:
      return {
        ...state,
        event: [...state.event]
          .filter(category => event.id !== action.event),
      };
    case SELECT:
      return {
        ...state,
        event: state.event
          .filter(category => event.id === action.event)[0],
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        event: {},
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

export const addPlazaEvents = events => ({
  type: ADD_EVENTS,
  events,
});

export const addPlazaEvent = event => ({
  type: ADD_EVENT,
  event,
});

export const selectEvent = eventId => ({
  type: SELECT,
  eventId,
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

export const deleteEvents = eventId => ({
  type: DELETE,
  eventId,
});

export const fetchEvents = () => ({
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

export const deleteEventAction = id => dispatch => fetch(`${defaultUrl}/events/${id}`, {
  method: 'DELETE',
  headers: {
    ...customHeaders,
  },
}).then(() => {
  dispatch(deleteEvents(id));
  swal(
    'Borrada!',
    'El evento ha sido borrado.',
    'success'
  );
})
.catch((error) => { showErrorMsg(error) });

export const updateEvent = (history, values, id) => dispatch => fetch(`${defaultUrl}/events/${id}`, {
  method: 'PUT',
  body: JSON.stringify(values), 
  headers: {
    ...customHeaders
  },
}).then(() => {
  swal({
    type: 'success',
    title: 'Evento actualizado',
    text: 'En un momento se te redireccionara al listado de Eventos',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/eventos');
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const createEvent = (history, values) => dispatch => fetch(`${defaultUrl}/events`, {
  method: 'POST',
  body: JSON.stringify(values), 
  headers: {
    ...customHeaders
  },
}).then(response => response.json())
.then((data) => {
  dispatch(addEvent(data.event));
  swal({
    type: 'success',
    title: 'Evento creado',
    text: 'En un momento se te redireccionara al listado de eventos',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/eventos');
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const getEvents = () => dispatch => fetch(`${defaultUrl}/events`, {
  headers: {
    ...customHeaders
  },
}).then(fetchStatusHandler)
  .then(response => response.json())
  .then(data => dispatch(addPlazaEvents(data.events)))
  .catch(error => { dispatch(setError('Error al cargar los eventos, recarga la pagina porfavor')); });
