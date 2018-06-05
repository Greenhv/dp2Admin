import fetchStatusHandler from 'Utils/fetchStatusHandler';
import { getCookie } from 'Utils/cookies';

// Actions
const FETCH = 'admin/roles/FETCH';
const ADD_ROLES = 'admin/roles/ADD_ROLES';
const ADD_ROLE = 'admin/roles/ADD_ROLE';
const SELECT = 'admin/roles/SELECT';
const EDIT = 'admin/roles/EDIT';
const DELETE = 'admin/roles/DELETE';
const ERROR = 'admin/roles/ERROR';
const CLEAR_SELECTED = 'admin/roles/CLEAR_SELECTED';

// Initial State
const initialState = {
  roles: [],
  selectedRole: {},
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
  switch(action.type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_ROLES:
      return {
        ...state,
        roles: [...action.roles],
        isLoading: false,
        error: '',
      };
    case ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.role],
        error: '',
      };
    case DELETE:
      return {
        ...state,
        roles: [...state.roles]
          .filter(role => role.id !== action.roleId),
      };
    case SELECT:
      return {
        ...state,
        selectedRole: state.roles
          .filter(role => role.id === action.roleId)[0],
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        selectedRole: {},
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

export const addRoles = roles => ({
  type: ADD_ROLES,
  roles,
});

export const addRole = role => ({
  type: ADD_ROLE,
  role,
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

export const selectRole = roleId => ({
  type: SELECT,
  roleId,
});

export const deleteRole = roleId => ({
  type: DELETE,
  roleId,
});

export const fetchRoles = () => ({
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
}

export const deleteRoleAction = id => dispatch => fetch(`${defaultUrl}/roles/${id}`, {
  method: 'DELETE',
  headers: {
    ...customHeaders,
  },
}).then(() => {
  swal(
    'Borrado!',
    'El rol ha sido borrado.',
    'success'
  )
  dispatch(deleteRol(id));
})
.catch((error) => { showErrorMsg(error) });

export const updateRol = (history, values, id) => dispatch => fetch(`${defaultUrl}/roles/${id}`, {
  method: 'PUT',
  body: JSON.stringify(values),
  headers: {
    ...customHeaders,
  },
}).then(() => {
  swal({
    type: 'success',
    title: 'Rol actualizado',
    text: 'En un momento se te redireccionara al listado de roles',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/roles');
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const createRole = (history, values) => dispatch => fetch(`${defaultUrl}/roles`, {
  method: 'POST',
  body: JSON.stringify(values),
  headers: {
    ...customHeaders
  },
}).then(response => response.json())
.then((data) => {
  dispatch(addProduct(data.rol));
  swal({
    type: 'success',
    title: 'Rol creado',
    text: 'En un momento se te redireccionara al listado de roles',
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    history.push('/roles');
  }, 1500);
})
.catch((error) => { showErrorMsg(error) });

export const getRoles = () => dispatch => fetch(`${defaultUrl}/roles`, {
  headers: {
    ...customHeaders
  },
}).then(fetchStatusHandler)
.then(response => response.json())
.then(data => dispatch(addRoles(data.roles)))
.catch(error => { dispatch(setError('Error al cargar los roles, recarga la pagina porfavor')); });