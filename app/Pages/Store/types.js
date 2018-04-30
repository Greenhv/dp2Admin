import {
  shape,
  string,
  number,
} from 'prop-types';

export const storeType = shape({
  id: number,
  adminId: number,
  name: string,
  logo: string,
  banner: string,
  description: string,
  webpage: string,
  contact_name: string,
  phone_number: string,
});
