
import {
  shape,
  string,
  number,
  bool,
} from 'prop-types';

// Promotion Type

export const promotionType = shape({
  id: number,
  only_mobile: bool,
  value: number,
  initial_date: string,
  final_date: string,
  store_id: number,
});
