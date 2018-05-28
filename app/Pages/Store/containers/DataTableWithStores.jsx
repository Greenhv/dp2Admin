import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  deleteStores,
  fetchStores,
  selectStore,
  getStores as requestStores
} from "Modules/stores";
import { getNumber } from "Utils/randomizer";
import DataTables from "Shared/DataTable.jsx";
import Loader from "Shared/Loader.jsx";
import "Components/Common/notify";
import { storeType } from "../types";

class DataTableWithStores extends PureComponent {
  componentDidMount() {
    const { getStores, stores } = this.props;

    getStores();
  }
  openImgModal = () => {
    console.log("Modal!");
  };

  render() {
    const {
      stores,
      isLoadingStores,
      storesError,
      selectStore,
      deleteStore
    } = this.props;

    if (storesError) {
      $.notify(storesError, "danger");
    }

    return (
      <div>
        {isLoadingStores ? (
          <Loader />
        ) : (
          <DataTables
            headers={[
              { key: "name", title: "Nombre" },
              { key: "description", title: "Descripcion" },
              { key: "webpage", title: " Pagina web" },
              { key: "contact_name", title: "Nombre del contacto" },
              { key: "phone_number", title: "Telefono" }
            ]}
          >
            {stores.map(element => (
              <tr key={getNumber()}>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.webpage}</td>
                <td>{element.contact_name}</td>
                <td>{element.phone_number}</td>
                <td>
                  <Button onClick={this.openImgModal}>
                    <em className="fa fa-image" />
                  </Button>
                </td>
                <td>
                  <Button onClick={selectStore && selectStore(element.id)}>
                    <em className="fa fa-eye" />
                  </Button>
                  <Button onClick={selectStore && selectStore(element.id)}>
                    <em className="fa fa-pencil" />
                  </Button>
                  <Button onClick={deleteStore && deleteStore(element.id)}>
                    <em className="fa fa-remove" />
                  </Button>
                </td>
              </tr>
            ))}
          </DataTables>
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
