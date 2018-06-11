import { shape, string, number } from 'prop-types';

export const userType = shape({
  name: string,
  email: string,
  role_id: number,
});
