import {
  shape,
  string,
  number,
  bool
} from 'prop-types';

// Event Type

export const eventType = shape({
  id: number,
  name: string,
  location: string,
  all_day: bool,
  initial_time: string,
  final_time: string,
  event_date: string,
  banner: string
});