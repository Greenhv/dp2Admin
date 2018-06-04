import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  deleteStoreCategoryAction,
  selectStoreCategory,
  fetchStoreCategories,
  getStoreCategories as requestStoreCategories
} from "Modules/storeCategories";
import DataTables from "Shared/DataTable";
import DataTableEmptyMsg from "Shared/DataTableEmptyMsg.jsx";
import Loader from "Shared/Loader.jsx";
import "Components/Common/notify";
import { storeCategoryType } from "../types";

class DataTableWithStoreCategories extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getStoreCategories
    } = props;

    getStoreCategories();
  }


  openImgModal = () => {
    console.log("Modal");
  };

  parseStoreCategories = () => {
    const {
      storeCategories,
    } = this.props;

    return storeCategories.map(storeCategory => [
      storeCategory.name,
      storeCategory.description,
      `${storeCategory.id}`,
    ]);
  }

  render() {
    const {
      storeCategories,
      isLoadingStoreCategories,
      storeCategoriesError,
      selectStoreCategory,
      deleteStoreCategoryAction,
    } = this.props;

    if (storeCategoriesError) {
      $.notify(storeCategoriesError, "danger");
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Descripción' },
    ];
    const data = this.parseStoreCategories();
    const options = {
      selectableRows: false,
    };

    console.log(data);
    return (
      <div>
        {isLoadingStoreCategories ? (
          <Loader />
        ) : (
          storeCategories.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
              editAction={selectStoreCategory}
              deleteAction={deleteStoreCategoryAction}
            />
          ) : (
            <Table responsive striped hover>
              <tbody>
                <DataTableEmptyMsg colSpan={6}>No hay categorias de tiendas para mostrar</DataTableEmptyMsg>
              </tbody>
            </Table>
          )
        )}
      </div>
    );
  }
}

DataTableWithStoreCategories.propTypes = {
  storeCategories: PropTypes.arrayOf(storeCategoryType).isRequired,
  isLoadingStoreCategories: PropTypes.bool.isRequired,
  selectStoreCategory: PropTypes.func.isRequired,
  deleteStoreCategoryAction: PropTypes.func.isRequired,
  getStoreCategories: PropTypes.func.isRequired
};

const mapStateToProps = ({
  storeCategories: { storeCategories, isLoading, error }
}) => ({
  storeCategories,
  isLoadingStoreCategories: isLoading,
  storeCategoriesError: error
});

const mapDispatchToProps = dispatch => ({
  getStoreCategories: () => {
    dispatch(fetchStoreCategories());
    dispatch(requestStoreCategories());
  },
  selectStoreCategory: category => () => {
    dispatch(selectStoreCategory(category));
  },
  deleteStoreCategoryAction: category => () => {
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
        dispatch(deleteStoreCategoryAction(category));
      }
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithStoreCategories
);
