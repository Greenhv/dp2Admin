import {
  shape,
  string,
  number,
} from 'prop-types';

// Product Type

export const productType = shape({
  id: number,
  brandId: number,
  image: string,
  name: string,
  price: number,
  priceUnitId: number,
});
