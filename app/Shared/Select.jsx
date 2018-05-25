import React from 'react';
import { arrayOf, string, shape } from 'prop-types';
import { FormControl } from 'react-bootstrap';

const Select = ({ options, placeholder, input, ...props }) => (
  <FormControl componentClass="select" className="form-control m-b" {...input} {...props}>
    <option value="" disabled selected>{ placeholder }</option>
    { options.map((option, index) => (
      <option key={index} value={option.value}>{ option.label }</option>
    )) }
  </FormControl>
);

Select.defaultProps = {
  options: [],
}

Select.propTypes = {
  options: arrayOf(shape({
    value: string,
    label: string,
  })),
};

export default Select;
