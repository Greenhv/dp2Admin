import {
  shape,
  string,
  number,
} from 'prop-types';

export const productCategoryType = shape({
  id: number,
  name: string,
  description: string,
});