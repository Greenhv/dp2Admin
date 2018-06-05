import fetchStatusHandler from 'Utils/fetchStatusHandler'
import {
    getCookie
} from 'Utils/cookies'

const FETCH = 'admin/brands/FETCH';
const ADD_BRANDS = 'admin/brands/ADD_BRANDS';
const ADD_BRAND = 'admin/brands/ADD_BRAND';
const SELECT = 'admin/brands/SELECT';
const EDIT = 'admin/brands/EDIT';
const DELETE = 'admin/brands/DELETE';
const ERROR = 'admin/brands/ERROR';
const CLEAR_SELECTED = 'admin/brands/CLEAR_SELECTED'

const initialState = {
    brands: [],
    selectedBrand: {},
    isLoading: false,
    error: '',
    isModalOpen: true,
};

const defaultUrl = process.env.API_BASE_URL;
const auth = getCookie('authToken');
const customHeaders = {
    'Authorization': auth,
    'content-type': 'application/json'
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_BRANDS:
            return {
                ...state,
                brands: [...action.brands],
                isLoading: false,
                error: '',
            };

        case ADD_BRAND:
            return {
                ...state,
                brands: [...state.brands, action.brand],
                error: '',
            };
            
        case DELETE:
            return {
                ...state,
                brands: [...state.brands]
                    .filter(brand => brand.id !== action.brandId),
            }
        case SELECT:
            return {
                ...state,
                selectedBrand: state.brands
                    .filter(brand => brand.id === action.brandId)[0]
            };
        case CLEAR_SELECTED:
            return {
                ...state,
                selectedBrand: {},
            };
        case ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;

    }
}

export const addBrands = brands => ({
    type: ADD_BRANDS,
    brands,
});

export const addBrand = brand => ({
    type: ADD_BRAND,
    brand,
});

export const clearSelected = () => ({
    type: CLEAR_SELECTED,
})

export const selectBrand = brandId => ({
    type: SELECT,
    brandId,
});

export const deleteBrand = brandId => ({
    type: DELETE,
    brandId
});

export const fetchBrands = () => ({
    type: FETCH,
})

export const setError = (error) => ({
    type: ERROR,
    error,
})

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

export const deleteBrandAction = id => dispatch => fetch(`${defaultUrl}/brands/${id}`, {
        method: 'DELETE',
        headers: {
            ...customHeaders,
        },
    }).then(() => {
        swal(
            'Borrado!',
            'El producto ha sido borrado.',
            'success'
        )
        dispatch(deleteBrand(id));
    })
    .catch((error) => {
        showErrorMsg(error)
    })

export const updateBrand = (history, values, id) => dispatch => fetch(`${defaultUrl}/brands/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            ...customHeaders,
        },
    }).then(() => {
        swal({
            type: 'success',
            title: 'Marca actualizada',
            text: 'En un momento se te redireccionara al listado de marcas',
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(() => {
            history.push('/marcas');
        }, 1500);
    })
    .catch((error) => {
        showErrorMsg(error)
    });
export const createBrand = (history, values) => dispatch => fetch(`${process.env.API_BASE_URL}/brands`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            ...customHeaders
        },
    }).then(response => response.json())
    .then((data) => {
        dispatch(addBrand(data.brand));
        swal({
            type: 'success',
            title: 'Marca creada',
            text: 'En un momento se te redireccionara al listado de productos',
            showConfirmButton: false,
            timer: 1500,
          });
        setTimeout( () => {
            history.push('/marcas');
        }, 1500);
    });

export const getBrands = () => dispatch => fetch(`${defaultUrl}/brands`, {
        headers: {
            ...customHeaders
        }
    }).then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => dispatch(addBrands(data.brands)))
    .catch(error => {
        dispatch(setError('Error al cargar marcas'));
    });