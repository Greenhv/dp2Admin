import {
    shape,
    string,
    number,
} from 'prop-types';

export const promotionType = shape({
    id: number,
    only_mobile: boolean,
    inicial_date: string,
    final_date: string,
    value: string,
    store_id: number,
})