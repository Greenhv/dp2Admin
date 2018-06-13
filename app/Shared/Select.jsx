import React, { PureComponent } from 'react';
import { arrayOf, string, number, shape, oneOfType, bool } from 'prop-types';
import { FormControl } from 'react-bootstrap';

class Select extends PureComponent {
  state = {
    selectedValues: [],
  }

  componentDidMount() {
    $(this.select).select2({
      theme: 'bootstrap',
      placeholder: this.props.placeholder,
      allowClear: true,
    });

    $(this.select).on('select2:select', this.selectItem);
    $(this.select).on('select2:unselect', this.unSelectItem);
  }

  componentDidUpdate() {
    if (this.select.value === '-1') {
      $(this.select).val(null).trigger('change');
    }
  }

  selectItem = (values) => {
    const id = values.params.data.id;
    const selectedValues = [...this.state.selectedValues];
    const newSelectedValues = [...selectedValues, id];

    this.props.input.onChange(newSelectedValues.length > 1 ? newSelectedValues : newSelectedValues[0]);
    this.setState({
      selectedValues: newSelectedValues,
    });
  }

  unSelectItem = (values) => {
    const id = values.params.data.id;
    const selectedValues = [...this.state.selectedValues];
    const newSelectedValues = [...selectedValues].filter(selectedValue => selectedValue !== id);

    this.props.input.onChange(newSelectedValues.length > 1 ? newSelectedValues : newSelectedValues[0]);
    this.setState({
      selectedValues: newSelectedValues,
    });
  }

  render() {
    const {
      options,
      multiple,
      name,
      input,
      ...props
    } = this.props;

    return (
      <select
        className="form-control"
        name={name}
        ref={(node) => { this.select = node; }}
        defaultValue="-1"
        multiple={multiple}
        {...input}
        {...props}
      >
        { options.map((option, index) => (
          <option key={index} value={option.value}>{ option.label }</option>
        )) }
      </select>
    );
  }
}

Select.defaultProps = {
  options: [],
  multiple: false,
}

Select.propTypes = {
  options: arrayOf(shape({
    value: oneOfType([
      string,
      number
    ]),
    name: string,
    multiple: bool,
  })),
};

export default Select;
