import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const parseDate = date => date ? moment(date, 'DD/MM/YYYY') : '';
const formatDate = date => date.format('DD/MM/YYYY');


const CustomDatePicker = ({
  input,
  name,
  placeholder,
  defaultValue,
  meta: { touched, error },
}) => {
  return (
    <DatePicker
      {...input}
      required
      name={name}
      dateForm="DD/MM/YYYY"
      placeholderText={placeholder}
      selected={parseDate(input.value)}
      onChange={date => input.onChange(formatDate(date))}
      onBlur={() => input.onBlur()}
      className="form-control date-picker"
    />
  );
};

export default CustomDatePicker;
