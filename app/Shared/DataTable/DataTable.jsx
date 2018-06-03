import React, { PureComponent } from 'react';
import { arrayOf, string, shape, oneOfType } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import ActionsCell from './ActionsCell.jsx';
import { getNumber } from 'Utils/randomizer';

class DataTable extends PureComponent {
  render() {
    const {
      headers,
      data,
      options,
      title,
      viewAction,
      deleteAction,
      editAction,
    } = this.props;
    const staticHeader = {
      name: 'Acciones',
      options: {
        customRender: () => (
          <ActionsCell
            viewAction={viewAction}
            deleteAction={deleteAction}
            editAction={editAction}
          />
        ),
      },
    }
    const newHeaders = [...headers, staticHeader];

    return (
      <MUIDataTable
        title={title}
        data={data}
        columns={newHeaders}
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
  headers: arrayOf(oneOfType([
    string,
    shape({}),
  ])).isRequired,
  data: arrayOf(arrayOf(string)).isRequired,
  title: string,
  options: shape({}),
}

export default DataTable;
