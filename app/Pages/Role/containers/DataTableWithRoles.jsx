import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  fetchRoles,
  getRoles as requestRoles,
} from 'Modules/roles';
import { transformToMoney, applyDiscount } from 'Utils/money';
import DataTables from 'Shared/DataTable';
import DataTableEmptyMsg from 'Shared/DataTableEmptyMsg.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { roleType } from '../types';

class DataTableWithProducts extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getRoles,
    } = props;

    getRoles();
  }

  openImgModal = () => {
    console.log("Modal!");
  };

  parseRoles = () => {
    const {
      roles,
    } = this.props;

    return roles.map(role => [
      role.name,
      roles.description
      `${role.id}`,
    ]);
  }

  render() {
    const {
      roles,
      isLoadingRoles,
      rolesError,
    } = this.props;

    if (rolesError) {
      $.notify(rolesError, "danger");
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Descripción' },
    ];
    const data = this.parseRoles();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        {isLoadingRoles ? (
          <Loader />
        ) : (
          roles.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
            />
          ) : (
            <Table responsive striped hover>
              <tbody>
                <DataTableEmptyMsg colSpan={6}>No hay productos para mostrar</DataTableEmptyMsg>
              </tbody>
            </Table>
          )
        )}
      </div>
    );
  }
}

DataTableWithProducts.propTypes = {
  roles: PropTypes.arrayOf(roleType).isRequired,
  isLoadingRoles: PropTypes.bool.isRequired,
  rolesError: PropTypes.string.isRequired,
  getRoles: PropTypes.func.isRequired,
};

const mapStateToProps = ({ roles: { roles, isLoading, error } }) => ({
  roles,
  isLoadingRoles: isLoading,
  rolesError: error
});

const mapDispatchToProps = dispatch => ({
  getRoles: () => {
    dispatch(fetchRoles());
    dispatch(requestRoles());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithProducts
);

