import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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
      name={name}
      dateForm="MM/DD/YYYY"
      placeholderText={placeholder}
      selected={input.value ? moment(input.value) : null}
      onChange={date => input.onChange(moment(date).format('MM/DD/YYYY'))}
      className="form-control date-picker"
    />
  );
};

export default CustomDatePicker;
