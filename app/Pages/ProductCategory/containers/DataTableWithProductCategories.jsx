import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table } from "react-bootstrap";

import {
  deleteProductCategoryAction,
  fetchProductCategories,
  selectProductCategories,
  getProductCategories as requestCategories,
} from 'Modules/productCategories';
import DataTables from 'Shared/DataTable';
import DataTableEmptyMsg from 'Shared/DataTableEmptyMsg.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { productCategoryType } from '../types';

class DataTableWithProductCategories extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getProductCategories,
    } = props;

    getProductCategories();
  }

  parseProductCategories = () => {
    const {
      productCategories,
    } = this.props;

    return productCategories.map(productCategory => [
      productCategory.name,
      productCategory.description,
      `${productCategory.id}`,
    ]);
  }

  render() {
    const {
      productCategories,
      isLoadingCategories,
      categoriesError,
      selectProductCategory,
      deleteProductCategory,
    } = this.props;

    if (categoriesError) {
      $.notify(categoriesError, 'danger');
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Descripción' },
    ];
    const data = this.parseProductCategories();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        { isLoadingCategories ? (
          <Loader />
        ) : (
          productCategories.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
              // viewAction={selectProduct}
              deleteAction={deleteProductCategory}
              editAction={selectProductCategory}
            />
          ) : (
            <Table responsive striped hover>
              <tbody>
                <DataTableEmptyMsg colSpan={6}>No hay categoria de productos para mostrar</DataTableEmptyMsg>
              </tbody>
            </Table>
          )
        ) }
      </div>
    );
  }
}

DataTableWithProductCategories.propTypes = {
  productCategories: PropTypes.arrayOf(productCategoryType).isRequired,
  isLoadingCategories: PropTypes.bool.isRequired,
  categoriesError: PropTypes.string.isRequired,
  selectProductCategory: PropTypes.func.isRequired,
  deleteProductCategory: PropTypes.func.isRequired,
  getProductCategories: PropTypes.func.isRequired,
}

const mapStateToProps = ({ productCategories: { productCategories, isLoading, error } }) => ({
  productCategories,
  isLoadingCategories: isLoading,
  categoriesError: error,
});

const mapDispatchToProps = dispatch => ({
  getProductCategories: () => {
    dispatch(fetchProductCategories())
    dispatch(requestCategories());
  },
  selectProductCategory: category => () => {
    dispatch(selectProductCategories(category));
  },
  deleteProductCategory: category => () => {
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
        dispatch(deleteProductCategoryAction(category));
      }
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTableWithProductCategories);
