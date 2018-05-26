import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import {
  deleteStoreCategories,
  fetchStoreCategories,
  selectStoreCategories,
  getStoreCategories as requestStoreCategories
} from "Modules/storeCategories";
import { getNumber } from "Utils/randomizer";
import DataTables from "Shared/DataTable.jsx";
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

  render() {
    const {
      storeCategories,
      isLoadingStoreCategories,
      storeCategoriesError,
      selectStoreCategories,
      deleteStoreCategories
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
            {storeCategories.map(element => (
              <tr key={getNumber()}>
                <td> {element.name} </td>
                <td> {element.description} </td>
                <td>
                  <Button onClick={this.openImgModal}>
                    <em className="fa fa-image" />
                  </Button>
                </td>
                <td>
                  <Button onClick={selectProduct && selectStoreCategories(element.id)}>
                    <em className="fa fa-eye" />
                  </Button>
                  <Button onClick={selectProduct && selectStoreCategories(element.id)}>
                    <em className="fa fa-pencil" />
                  </Button>
                  <Button onClick={deleteProduct && deleteStoreCategories(element.id)}>
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

DataTableWithStoreCategories.propTypes = {
  storeCategories: PropTypes.arrayOf(storeCategoryType).isRequired,
  isLoadingStoreCategories: PropTypes.bool.isRequired,
  storeCategoriesError: PropTypes.string.isRequired,
  selectStoreCategories: PropTypes.func.isRequired,
  deleteStoreCategories: PropTypes.func.isRequired,
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
  selectStoreCategories: category => () => {
    dispatch(selectStoreCategories(category));
  },
  deleteStoreCategories: category => () => {
    dispatch(deleteStoreCategories(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithStoreCategories
);
