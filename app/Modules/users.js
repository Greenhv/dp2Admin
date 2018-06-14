import fetchStatusHandler from 'Utils/fetchStatusHandler';
import { getCookie } from 'Utils/cookies';

// Actions
const FETCH = 'admin/users/FETCH';
const ADD_USERS = 'admin/users/ADD_STORE_CATEGORIES';
const ADD_USER = 'admin/users/ADD_STORE_CATEGORY';
const SELECT = 'admin/users/SELECT';
const CLEAR_SELECT = 'admin/users/CLEAR_SELECT';
const EDIT = 'admin/users/EDIT';
const DELETE = 'admin/users/DELETE';
const ERROR = 'admin/users/ERROR';

// Initial State
const initialState = {
  users: [],
  selectedUser: {},
  isLoading: false,
  error: '',
  isModalOpen: true,
};

// Reducer

const defaultUrl = process.env.API_BASE_URL;
const auth = getCookie('authToken');
const customHeaders = {
  Authorization: auth ? auth.authToken : '',
  'content-type': 'application/json',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_USERS:
      return {
        ...state,
        users: [...action.users],
        isLoading: false,
        error: '',
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],
        isLoading: false,
        error: '',
      };
    case DELETE:
      return {
        ...state,
        users: [...state.users].filter(user => user.id !== action.userId),
      };
    case SELECT:
      return {
        ...state,
        selectedUser: [...state.users].filter(
          user => user.id === action.userId
        )[0],
      };
    case CLEAR_SELECT:
      return {
        ...state,
        selectedUser: {},
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

export const addUsers = users => ({
  type: ADD_USERS,
  users,
});

export const addUser = user => ({
  type: ADD_USER,
  user,
});

export const selectUser = userId => ({
  type: SELECT,
  userId,
});

export const clearSelected = () => ({
  type: CLEAR_SELECT,
});

export const deleteUser = userId => ({
  type: DELETE,
  userId,
});

export const fetchUsers = () => ({
  type: FETCH,
});

export const setError = error => ({
  type: ERROR,
  error,
});

// Side effects

const showErrorMsg = error => {
  console.log(error);
  swal({
    type: 'error',
    title: 'Ocurrio un error',
    text: 'Por favor vuelve a intentarlo en unos segundos',
    showConfirmButton: false,
    timer: 1500,
  });
};

export const deleteUserAction = id => dispatch =>
  fetch(`${defaultUrl}/users/${id}`, {
    method: 'DELETE',
    headers: {
      ...customHeaders,
    },
  })
    .then(() => {
      dispatch(deleteUser(id));
      swal('Borrada!', 'El usuario ha sido borrado.', 'success');
    })
    .catch(error => {
      showErrorMsg(error);
    });

export const updateUser = (history, values, id) => dispatch =>
  fetch(`${defaultUrl}/users/${id}`, {
    method: 'PUT',
    // body: JSON.stringify(values),
    body: values,
    headers: {
      // ...customHeaders
      Authorization: auth ? auth.authToken : '',
    },
  })
    .then(() => {
      swal({
        type: 'success',
        title: 'Usuario actualizado',
        text: 'En un momento se te redireccionara al listado de usuarios',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push('/usuarios');
      }, 1500);
    })
    .catch(error => {
      showErrorMsg(error);
    });

export const createUser = (history, values) => dispatch =>
  fetch(`${defaultUrl}/users/create_admin`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      ...customHeaders,
    },
  })
    .then(response => response.json())
    .then(data => {
      dispatch(addUser(data.user));
      swal({
        type: 'success',
        title: 'Usuario creado',
        text: 'En un momento se te redireccionara al listado de usuarios',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push('/usuarios');
      }, 1500);
    })
    .catch(error => {
      showErrorMsg(error);
    });

export const getUsers = () => dispatch =>
  fetch(`${defaultUrl}/users/get_admins`, {
    headers: {
      ...customHeaders,
    },
  })
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => dispatch(addUsers(data.users)))
    .catch(error => {
      console.log(error);
      dispatch(
        setError('Error al cargar las categorias, recarga la pagina porfavor')
      );
    });
