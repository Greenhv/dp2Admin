import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { getNumber } from 'Utils/randomizer';

class DataTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      idName: `data-table-${getNumber()}`,
    }
  }

  componentDidMount() {
    const {
      idName,
    } = this.state;

    // Aggg
    $(`#${idName}`).dataTable({
        'paging': true,
        'ordering': true,
        'info': true,
        'responsive': true,
        oLanguage: {
            sSearch: 'Search all columns:',
            sLengthMenu: '_MENU_ records per page',
            info: 'Showing page _PAGE_ of _PAGES_',
            zeroRecords: 'Nothing found - sorry',
            infoEmpty: 'No records available',
            infoFiltered: '(filtered from _MAX_ total records)'
        },
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy',  className: 'btn-sm' },
            {extend: 'csv',   className: 'btn-sm' },
            {extend: 'excel', className: 'btn-sm', title: 'XLS-File'},
            {extend: 'print', className: 'btn-sm' }
        ]
    });
  }

  render() {
    const {
      headers,
      children,
    } = this.props;
    const {
      idName,
    } = this.state;

    return (
      <Table id={idName} responsive striped hover>
        <thead>
          <tr>
            { headers.map(header => (
              <th key={getNumber()}>{ header.title }</th>
            )) }
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </Table>
    );
  }
}

DataTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
}

export default DataTable;
