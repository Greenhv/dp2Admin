import React from 'react';
import { shape } from 'prop-types';
import { Radio } from 'react-bootstrap';

const CustomRadio = ({ input, label, value, required }) => {
  return (
    <Radio
      {...input}
      value={value}
      required={required}
      inline
      checked={input.value && input.value === value}
    >
      {label}
    </Radio>
  );
};

CustomRadio.propTypes = {
  input: shape({}).isRequired,
  props: shape({}).isRequired,
};

export default CustomRadio;
