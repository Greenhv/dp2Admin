import React, { PureComponent } from 'react';
import { arrayOf, string } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import { getNumber } from 'Utils/randomizer';

class DataTable extends PureComponent {
  render() {
    const {
      headers,
      children,
    } = this.props;

    return (
      <MUIDataTable
        title={title}
        data={data}
        columns={headers}
        options={options}
      />
    );
  }
}
DataTable.defaultProps = {
  title: '',
  options: {},
};

DataTable.propTypes = {
  headers: arrayOf(string).isRequired,
  data: arrayOf(arrayOf(string)).isRequired,
  title: string,
  options: shape({}),
}

export default DataTable;
