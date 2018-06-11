import React, { PureComponent } from 'react';
import { arrayOf, string, number, shape, oneOfType } from 'prop-types';
import { FormControl } from 'react-bootstrap';

class Select extends PureComponent {
  componentDidMount() {
    $(this.select).select2({
      theme: 'bootstrap',
      placeholder: this.props.placeholder,
      allowClear: true,
    });
  }

  componentDidUpdate() {
    if (this.select.value === '-1') {
      $(this.select).val(null).trigger('change');
    }
  }

  render() {
    const {
      options,
      input,
      ...props
    } = this.props;

    return (
      <select className="form-control" {...input} {...props} ref={(node) => { this.select = node; }} defaultValue="-1">
        <option value="-1"></option>
        { options.map((option, index) => (
          <option key={index} value={option.value}>{ option.label }</option>
        )) }
      </select>
    );
  }
}

Select.defaultProps = {
  options: [],
}

Select.propTypes = {
  options: arrayOf(shape({
    value: oneOfType([
      string,
      number
    ]),
    label: string,
  })),
};

export default Select;
