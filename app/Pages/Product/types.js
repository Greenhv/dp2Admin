import {
  shape,
  string,
  number,
} from 'prop-types';

// Product Type

export const productType = shape({
  id: number,
  brand: {
    id: number,
    name: string,
  },
  image: string,
  name: string,
  price: string,
});
