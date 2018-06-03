import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  deleteStores,
  fetchStores,
  selectStore,
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
      '',
    ]);
  }

  render() {
    const {
      stores,
      isLoadingStores,
      storesError,
      selectStore,
      deleteStore,
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

    console.log(data);
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
              editAction={selectStore}
              deleteAction={deleteStore}
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

DataTableWithStores.propTypes = {
  stores: PropTypes.arrayOf(storeType).isRequired,
  isLoadingStores: PropTypes.bool.isRequired,
  storesError: PropTypes.string.isRequired,
  selectStore: PropTypes.func.isRequired,
  deleteStore: PropTypes.func.isRequired,
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
  selectStore: store => () => {
    dispatch(selectStore(store));
  },
  deleteStore: store => () => {
    dispatch(deleteStore(store));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithStores
);
