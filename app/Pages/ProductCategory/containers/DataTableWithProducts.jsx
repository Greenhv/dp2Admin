import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DataTables from '../../../shared/DataTable.jsx';
import { fetchProducts, selectProduct, deleteProduct } from 'Modules/products';

class DataTableWithProducts extends PureComponent {
  componentDidMount() {
    const {
      getProducts,
    } = this.props;

    getProducts();
  }

  render() {
    const {
      products,
      selectProduct,
      deleteProduct,
    } = this.props;

    return (
      <div>
        { products.length > 0 ? (
          <DataTables
            headers={[{ key: 'name', title: 'Nombre' }, { key: 'brand', title: 'Marca' }]}
            elements={products}
            onView={selectProduct}
            onEdit={selectProduct}
            onDelete={deleteProduct}
          />
        ) : (
          <div>No hay ningun producto para mostrar</div>
        ) }
      </div>
    );
  }
}

DataTableWithProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  getProducts: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
}

const mapStateToProps = ({ products }) => ({
  products: products.products,
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => { dispatch(fetchProducts()) },
  selectProduct: product => () => {
    dispatch(selectProduct(product));
  },
  deleteProduct: product => () => {
    dispatch(deleteProduct(product));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTableWithProducts);
