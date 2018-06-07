import {
    shape,
    string,
    number,
} from 'prop-types';
import PropTypes from 'prop-types';

export const promotionType = shape({
    id: number,
    only_mobile: PropTypes.bool,
    initial_date: string,
    final_date: string,
    value: string,
    store_id: number,
})