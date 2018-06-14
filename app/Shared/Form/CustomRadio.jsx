import React from 'react'
import { shape } from 'prop-types';
import { Radio } from 'react-bootstrap';

const CustomRadio = ({ input, label, value, required }) => {
  console.log(input.value);
  return (
    <Radio {...input} value={value} required={required} inline checked={input.value === value}>
      {label}
    </Radio>
  )
}

CustomRadio.propTypes = {
  input: shape({}).isRequired,
  props: shape({}).isRequired,
};

export default CustomRadio;
