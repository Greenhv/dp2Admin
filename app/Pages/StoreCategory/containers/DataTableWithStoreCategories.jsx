import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import {
  deleteStoreCategory,
  fetchStoreCategories,
  selectStoreCategory,
  getStoreCategories as requestStoreCategories
} from "Modules/storeCategories";
import { getNumber } from "Utils/randomizer";
import DataTables from "Shared/DataTable.jsx";
import DataTableEmptyMsg from "Shared/DataTableEmptyMsg.jsx";
import Loader from "Shared/Loader.jsx";
import "Components/Common/notify";
import { storeCategoryType } from "../types";

class DataTableWithStoreCategories extends PureComponent {
  componentDidMount() {
    const { getStoreCategories, storeCategories } = this.props;

    if (storeCategories.length < 1) {
      getStoreCategories();
    }
  }

  openImgModal = () => {
    console.log("Modal");
  };

  renderElements = () => {
    const {
      storeCategories,
      selectStoreCategory,
      deleteStoreCategory
    } = this.props;

    return storeCategories.map(storeCategory => (
      <tr key={getNumber()}>
        <td>{storeCategory.name}</td>
        <td>{storeCategory.description}</td>
        <td>
          <Button onClick={this.openImgModal}>
            <em className="fa fa-image" />
          </Button>
          <Button
            onClick={
              selectStoreCategory && selectStoreCategory(storeCategory.id)
            }
          >
            <em className="fa fa-eye" />
          </Button>
          <Button
            onClick={
              selectStoreCategory && selectStoreCategory(storeCategory.id)
            }
          >
            <em className="fa fa-pencil" />
          </Button>
          <Button
            onClick={
              deleteStoreCategory && deleteStoreCategory(storeCategory.id)
            }
          >
            <em className="fa fa-remove" />
          </Button>
        </td>
      </tr>
    ));
  };

  render() {
    const {
      storeCategories,
      isLoadingStoreCategories,
      storeCategoriesError
    } = this.props;

    if (storeCategoriesError) {
      $.notify(storeCategoriesError, "danger");
    }

    return (
      <div>
        {isLoadingStoreCategories ? (
          <Loader />
        ) : (
          <DataTables
            headers={[
              { key: "name", title: "Nombre" },
              { key: "description", title: "Descripcion" }
            ]}
          >
            {storeCategories.length > 0 ? (
              this.renderElements()
            ) : (
              <DataTableEmptyMsg colSpan={6}>
                No hay categorias para mostrar
              </DataTableEmptyMsg>
            )}
          </DataTables>
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
