import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import {
  fetchProducts,
  selectProduct,
  deleteProduct,
  getProducts as requestProducst
} from "Modules/products";
import { getNumber } from "Utils/randomizer";
import { transformToMoney, applyDiscount } from "Utils/money";
import DataTables from "Shared/DataTable.jsx";
import Loader from "Shared/Loader.jsx";
import "Components/Common/notify";
import { productType } from "../types";

class DataTableWithProducts extends PureComponent {
  componentDidMount() {
    const { getProducts, products } = this.props;

    if (products.length < 1) {
      getProducts();
    }
  }

  openImgModal = () => {
    console.log("Modal!");
  };

  render() {
    const {
      products,
      isLoadingProducts,
      productsError,
      selectProduct,
      deleteProduct
    } = this.props;

    if (productsError) {
      $.notify(productsError, "danger");
    }

    return (
      <div>
        {isLoadingProducts ? (
          <Loader />
        ) : (
          <DataTables
            headers={[
              { key: "name", title: "Nombre" },
              { key: "price", title: "Precio de Lista" },
              { key: "discount", title: "Descuento" },
              { key: "realPrice", title: "Precio Neto" },
              { key: "brand", title: "Marca" },
              { key: "img", title: "Imagen" }
            ]}
          >
            {products.map(element => (
              <tr key={getNumber()}>
                <td>{element.name}</td>
                <td>{transformToMoney(element.price)}</td>
                <td>{element.promotion.value}</td>
                <td>
                  {element.promotion
                    ? applyDiscount(element.price, element.promotion.value)
                    : "-"}
                </td>
                <td>{element.brand.name}</td>
                <td>
                  <Button onClick={this.openImgModal}>
                    <em className="fa fa-image" />
                  </Button>
                </td>
                <td>
                  <Button onClick={selectProduct && selectProduct(element.id)}>
                    <em className="fa fa-eye" />
                  </Button>
                  <Button onClick={selectProduct && selectProduct(element.id)}>
                    <em className="fa fa-pencil" />
                  </Button>
                  <Button onClick={deleteProduct && deleteProduct(element.id)}>
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
