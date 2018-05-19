import React from 'react';
import { arrayOf, string, shape } from 'prop-types';
import { FormControl } from 'react-bootstrap';

const Select = ({ options, placeholder, ...props }) => (
  <FormControl componentClass="select" className="form-control m-b" {...props}>
    <option value="" disabled defaultValue>{ placeholder }</option>
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
