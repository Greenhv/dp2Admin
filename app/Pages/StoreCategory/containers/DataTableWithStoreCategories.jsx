import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  deleteStoreCategory,
  fetchStoreCategories,
  selectStoreCategory,
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
      '',
    ]);
  }

  render() {
    const {
      storeCategories,
      isLoadingStoreCategories,
      storeCategoriesError,
      selectStoreCategory,
      deleteStoreCategory,
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
              deleteAction={deleteStoreCategory}
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

DataTableWithStoreCategories.propTypes = {
  storeCategories: PropTypes.arrayOf(storeCategoryType).isRequired,
  isLoadingStoreCategories: PropTypes.bool.isRequired,
  selectStoreCategory: PropTypes.func.isRequired,
  deleteStoreCategory: PropTypes.func.isRequired,
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
    dispatch(selectStoreCategories(category));
  },
  deleteStoreCategory: category => () => {
    dispatch(deleteStoreCategories(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithStoreCategories
);
