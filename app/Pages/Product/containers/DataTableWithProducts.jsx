import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";

import {
  fetchProducts,
  selectProduct,
  deleteProduct,
  getProducts as requestProducst,
} from 'Modules/products';
import { transformToMoney, applyDiscount } from 'Utils/money';
import DataTables from 'Shared/DataTable';
import DataTableEmptyMsg from 'Shared/DataTableEmptyMsg.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { productType } from '../types';

class DataTableWithProducts extends PureComponent {
  constructor(props) {
    super(props);

    const {
      getProducts
    } = props;

    getProducts();
  }

  openImgModal = () => {
    console.log("Modal!");
  };

  parseProducts = () => {
    const {
      products,
    } = this.props;

    return products.map(product => [
      product.name,
      transformToMoney(product.price),
      product.promotion ? product.promotion.value : '-',
      product.promotion ? applyDiscount(product.price, product.promotion.value) : '-',
      product.brand.name,
      product.image,
      `${product.id}`,
    ]);
  }

  render() {
    const {
      products,
      isLoadingProducts,
      productsError,
      removeProduct,
      editProduct,
    } = this.props;

    if (productsError) {
      $.notify(productsError, "danger");
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Precio de Lista' },
      { name: 'Descuento' },
      { name: 'Precio Neto' },
      { name: 'Marca' },
      { name: 'Imagen' },
    ];
    const data = this.parseProducts();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        {isLoadingProducts ? (
          <Loader />
        ) : (
          products.length > 0 ? (
            <DataTables
              headers={headers}
              data={data}
              options={options}
              // viewAction={selectProduct}
              deleteAction={removeProduct}
              editAction={editProduct}
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
  products: PropTypes.arrayOf(productType).isRequired,
  isLoadingProducts: PropTypes.bool.isRequired,
  productsError: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

const mapStateToProps = ({ products: { products, isLoading, error } }) => ({
  products,
  isLoadingProducts: isLoading,
  productsError: error
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => {
    dispatch(fetchProducts());
    dispatch(requestProducst());
  },
  editProduct: product => () => {
    dispatch(selectProduct(product));
  },
  removeProduct: product => () => {
    dispatch(deleteProduct(product));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithProducts
);
