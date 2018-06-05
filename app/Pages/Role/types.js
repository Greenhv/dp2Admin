import {
  shape,
  string,
} from 'prop-types';

// Product Type

export const roleType = shape({
  name: string,
  description: string,
});
