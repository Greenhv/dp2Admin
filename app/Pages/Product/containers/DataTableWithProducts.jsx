import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Modal } from 'react-bootstrap';

import {
  fetchProducts,
  selectProduct,
  deleteProductAction,
  displayImage,
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

    const { getProducts } = props;

    getProducts();
  }

  state = {
    modalOpen: false,
  };

  openImgModal = seeImg => () => {
    seeImg();
    this.setState({
      modalOpen: true,
    });
  };

  closeImgModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  parseProducts = () => {
    const { products } = this.props;

    return products.map(product => [
      product.name,
      transformToMoney(product.price),
      product.promotion.id ? product.promotion.value : '-',
      product.promotion.id
        ? applyDiscount(product.price, product.promotion.value)
        : transformToMoney(product.price),
      product.brand.name,
      product.image,
      `${product.id}`,
    ]);
  };

  render() {
    const {
      products,
      isLoadingProducts,
      productsError,
      removeProduct,
      editProduct,
      productImage,
      seeImg,
    } = this.props;

    if (productsError) {
      $.notify(productsError, 'danger');
    }

    const headers = [
      { name: 'Nombre' },
      { name: 'Precio de Lista' },
      { name: 'Descuento' },
      { name: 'Precio Neto' },
      { name: 'Marca' },
      {
        name: 'Imagen',
        options: {
          customRender: (index, value) => (
            <Button onClick={this.openImgModal(seeImg(value))}>
              <em className="fa fa-image" />
            </Button>
          ),
        },
      },
    ];
    const data = this.parseProducts();
    const options = {
      selectableRows: false,
    };

    return (
      <div>
        {isLoadingProducts ? (
          <Loader />
        ) : products.length > 0 ? (
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
              <DataTableEmptyMsg colSpan={6}>
                No hay productos para mostrar
              </DataTableEmptyMsg>
            </tbody>
          </Table>
        )}
        <Modal show={this.state.modalOpen} onHide={this.closeImgModal}>
          <Modal.Header closeButton>
            <Modal.Title>Imagen del Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img
                src={productImage}
                alt="Product Image"
                style={{ width: '100%' }}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

DataTableWithProducts.defaultProps = {
  productImage: '',
};

DataTableWithProducts.propTypes = {
  products: PropTypes.arrayOf(productType).isRequired,
  isLoadingProducts: PropTypes.bool.isRequired,
  productsError: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  seeImg: PropTypes.func.isRequired,
  productImage: PropTypes.string,
};

const mapStateToProps = ({
  products: { products, isLoading, error, productImage },
}) => ({
  products,
  isLoadingProducts: isLoading,
  productsError: error,
  productImage,
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
    swal({
      title: 'Estas seguro?',
      text: 'No se podrá revertir este cambio',
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        dispatch(deleteProductAction(product));
      }
    });
  },
  seeImg: img => () => {
    dispatch(displayImage(img));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableWithProducts);
