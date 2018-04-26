import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

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
      elements,
      onView,
      onEdit,
      onDelete,
    } = this.props;
    const {
      idName,
    } = this.state;

    return (
      <Table id={idName} responsive striped hover>
        <thead>
          <tr>
            { headers.map(header => (
              <th>{ header.title }</th>
            )) }
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { products.map(product => (
            <tr>
              { headers.map(header => (
                <td>{ product[header.key] }</td>
              )) }
              <td>
                <Button onClick={onView && onView(product.id)}>
                  <em className="fa fa-eye"></em>
                </Button>
                <Button onClick={onEdit && onEdit(product.id)}>
                  <em className="fa fa-pencil"></em>
                </Button>
                <Button onClick={onDelete && onDelete(product.id)}>
                  <em className="fa fa-remove"></em>
                </Button>
              </td>
            </tr>
          )) }
        </tbody>
      </Table>
    );
  }
}

DataTable.defaultProps = {
  onView: null,
  onEdit: null,
  onDelete: null,
};

DataTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default DataTable;
