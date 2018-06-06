import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  deleteStoreAction,
  selectStore,
  fetchStores,
  getStores as requestStores
} from "Modules/stores";
import DataTables from "Shared/DataTable";
import DataTableEmptyMsg from "Shared/DataTableEmptyMsg.jsx";
import Loader from "Shared/Loader.jsx";
import "Components/Common/notify";
import { storeType } from "../types";

class DataTableWithStores extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getStores
    } = props;

    getStores();
  }

  openImgModal = () => {
    console.log("Modal!");
  };

  parseStores = () => {
    const {
      stores,
    } = this.props;

    return stores.map(store => [
      store.name,
      store.description,
      store.webpage,
      store.contact_name ? store.contact_name : '',
      store.phone_number ? store.contact_name : '',
      `${store.id}`,
    ]);
  }

  render() {
    const {
      stores,
      isLoadingStores,
      storesError,
      chooseStore,
      removeStore,
    } = this.props;

    if (storesError) {
      $.notify(storesError, "danger");
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Descripcioón' },
      { name: 'Pagina web' },
      { name: 'Nombre del contacto' },
      { name: 'Telefono' },
    ];
    const data = this.parseStores();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        {isLoadingStores ? (
          <Loader />
        ) : (
          stores.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
              editAction={chooseStore}
              deleteAction={removeStore}
            />
          ) : (
            <Table responsive striped hover>
              <tbody>
                <DataTableEmptyMsg colSpan={6}>No hay tiendas para mostrar</DataTableEmptyMsg>
              </tbody>
            </Table>
          )
        )}
      </div>
    );
  }
}

DataTableWithStores.propTypes = {
  stores: PropTypes.arrayOf(storeType).isRequired,
  isLoadingStores: PropTypes.bool.isRequired,
  storesError: PropTypes.string.isRequired,
  chooseStore: PropTypes.func.isRequired,
  removeStore: PropTypes.func.isRequired,
  getStores: PropTypes.func.isRequired
};

const mapStateToProps = ({ stores: { stores, isLoading, error } }) => ({
  stores,
  isLoadingStores: isLoading,
  storesError: error
});

const mapDispatchToProps = dispatch => ({
  getStores: () => {
    dispatch(fetchStores());
    dispatch(requestStores());
  },
  chooseStore: store => () => {
    dispatch(selectStore(store));
  },
  removeStore: store => () => {
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
        dispatch(deleteStoreAction(store));
      }
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithStores
);
