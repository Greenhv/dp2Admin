import React from 'react';
import { shape } from 'prop-types';
import { FormControl } from 'react-bootstrap';

const CustomInput = ({ input, ...props }) => (
  <FormControl
    {...input}
    {...props}
  />
);

CustomInput.propTypes = {
  input: shape({}).isRequired,
};

export default CustomInput;
