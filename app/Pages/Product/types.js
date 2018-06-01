import {
  shape,
  string,
  number,
} from 'prop-types';

// Product Type

export const productType = shape({
  id: number,
  brand: shape({
    id: number,
    name: string,
  }),
  image: string,
  name: string,
  price: string,
});
