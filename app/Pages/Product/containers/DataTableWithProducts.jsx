import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button } from 'react-bootstrap';

import {
  fetchProducts,
  selectProduct,
  deleteProduct,
  getProducts as requestProducst,
} from 'Modules/products';
import { getNumber } from 'Utils/randomizer';
import { transformToMoney, applyDiscount } from 'Utils/money';
import DataTables from 'Shared/DataTable.jsx';
import Loader from 'Shared/Loader.jsx';
import DataTableEmptyMsg from 'Shared/DataTableEmptyMsg.jsx';
import 'Components/Common/notify';
import { productType } from '../types';

class DataTableWithProducts extends PureComponent {
  constructor(props) {
    super(props);
    const { getProducts } = props;

    console.log('constructor!');
    getProducts();
  }

  openImgModal = () => {
    console.log("Modal!");
  };

  renderElements = () => {
    const {
      products,
      selectProduct,
      deleteProduct,
    } = this.props;

    return products.map(product => (
      <tr key={getNumber()}>
        <td>{ product.name }</td>
        <td>{ transformToMoney(product.price) }</td>
        <td>{ product.promotion.value }</td>
        <td>{ product.promotion ? applyDiscount(product.price, product.promotion.value) : '-' }</td>
        <td>{ product.brand.name }</td>
        <td>
          <Button onClick={this.openImgModal}>
            <em className="fa fa-image"></em>
          </Button>
        </td>
        <td>
          <Button onClick={selectProduct && selectProduct(product.id)}>
            <em className="fa fa-eye"></em>
          </Button>
          <Button onClick={selectProduct && selectProduct(product.id)}>
            <em className="fa fa-pencil"></em>
          </Button>
          <Button onClick={deleteProduct && deleteProduct(product.id)}>
            <em className="fa fa-remove"></em>
          </Button>
        </td>
      </tr>
    ));
  }

  render() {
    const {
      products,
      isLoadingProducts,
      productsError,
    } = this.props;

    if (productsError) {
      $.notify(productsError, "danger");
    }

    const headers = ["Nombre", "Precio de Lista", "Descuento", "Precio Neto", "Marca", "Imagen"];
    const data = this.parseData();
    const options = {
      selectableRows: false,
      onRowsDelete: deleteProduct,
    };

    return (
      <div>
        {isLoadingProducts ? (
          <Loader />
        ) : (
          products.length > 0 ? (
            <DataTables
              headers={}
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
  selectProduct: PropTypes.func.isRequired
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
  selectProduct: product => () => {
    dispatch(selectProduct(product));
  },
  deleteProduct: product => () => {
    dispatch(deleteProduct(product));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataTableWithProducts
);
