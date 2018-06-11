import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  deleteUserAction,
  selectUser,
  fetchUsers,
  getUsers as requestUsers
} from "Modules/users";
import DataTables from "Shared/DataTable";
import DataTableEmptyMsg from "Shared/DataTableEmptyMsg.jsx";
import Loader from "Shared/Loader.jsx";
import "Components/Common/notify";
import { userType } from "../types";

class DataTableWithUsers extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getUsers,
    } = props;

    getUsers();
  }

  parseUsers = () => {
    const {
      users,
    } = this.props;

    return users.map(user => [
      user.name,
      user.email,
      `${user.id}`,
    ]);
  }

  render() {
    const {
      users,
      isLoadingUsers,
      usersError,
      editUser,
      deleteUser,
    } = this.props;

    if (usersError) {
      $.notify(usersError, "danger");
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Email' },
    ];
    const data = this.parseUsers();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        {isLoadingUsers ? (
          <Loader />
        ) : (
          users.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
              editAction={editUser}
              deleteAction={deleteUser}
            />
          ) : (
            <Table responsive striped hover>
              <tbody>
                <DataTableEmptyMsg colSpan={6}>No hay usuarios para mostrar</DataTableEmptyMsg>
              </tbody>
            </Table>
          )
        )}
      </div>
    );
  }
}

DataTableWithUsers.propTypes = {
  users: PropTypes.arrayOf(userType).isRequired,
  isLoadingUsers: PropTypes.bool.isRequired,
  usersError: PropTypes.string.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = ({
  users: { users, isLoading, error }
}) => ({
  users,
  isLoadingUsers: isLoading,
  usersError: error
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    dispatch(fetchUsers());
    dispatch(requestUsers());
  },
  editUser: user => () => {
    dispatch(selectUser(user));
  },
  deleteUser: user => () => {
    swal({
      title: 'Estas seguro?',
      text: "No se podrá revertir este cambio",
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteUserAction(user));
      }
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithUsers
);
