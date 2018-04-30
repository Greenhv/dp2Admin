import {
  shape,
  string,
  number,
} from 'prop-types';

export const storeCategoryType = shape({
  id: number,
  name: string,
  description: string,
  icon: string,
});
