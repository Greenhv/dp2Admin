import {
    shape,
    string,
    number,
} from 'prop-types';

//Brand Type

export const brandType = shape({
    id: number,
    name: string,
    description: string,
    corporation_name: string,
})