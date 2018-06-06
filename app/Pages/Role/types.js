import {
  shape,
  string,
} from 'prop-types';

// Role Type

export const roleType = shape({
  name: string,
  description: string,
});
