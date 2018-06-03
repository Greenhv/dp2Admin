import fetchStatusHandler from 'Utils/fetchStatusHandler'

const FETCH = 'admin/brands/FETCH';
const ADD_BRANDS = 'admin/brands/ADD_BRANDS';
const ADD_BRAND = 'admin/brands/ADD_BRAND';
const SELECT = 'admin/brands/SELECT';
const EDIT = 'admin/brands/EDIT';
const DELETE = 'admin/brands/DELETE;
const ERROR = 'admin/brands/ERROR';

const initialState = {
    brands: [],
    selectedBrand: {},
    isLoading: false,
    error: '',
    isModalOpen: true,
}

const defaultUrl = process.env.API_BASE_URL;
const auth = process.env.DEFAULT_ACCESS_TOKEN;
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
                brands: [...state.brands]
            };

        case ADD_BRAND:
            return {
                ...state,
                brands: [...state.brands, action.brand],
                isLoading: falses,
                error: '',
            };

        case DELETE:
            return {
                ...state,
                selectedBrand: state.brands
                    .filter(brand => brand.id == action.brandId)[0],
            }
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

export const selectBrand = brandId => ({
    type: SELECT,
    brandId,
});

export const deleteBrands = brandId => ({
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

export const createBrand = (history, values) => dispatch => (`${process.env.API_BASE_URL}/brands`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            ...customHeaders
        },
    }).then(response => response.json())
    .then((data) => {
        dispatch(addBrand(data.brand));
        history.push('/marcas');
    });

export const getBrands = () => dispatch => fetch(`$(defaultUrl)/brands`, {
        headers: {
            ...customHeaders
        }
    }).then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => dispatch(addBrands(data.brand)))
    .catch(error => {
        dispatch(setError('Error al cargar marcas'));
    });