import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts, selectProduct } from 'Modules/products';

class ListPage extends PureComponent {
  componentDidMount() {
    const {
      getProducts,
    } = this.props;

    getProducts();
  };

  render() {
    const {
      products,
      onSelectProduct,
    } = this.props;

    return (
      <div>
        1
      </div>
    );
  }
}

ListPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  getProducts: PropTypes.func.isRequired,
  onSelectProduct: PropTypes.func.isRequired,
};

const mapStateToProps = ({ products }) => ({
  products: products.products,
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => { dispatch(fetchProducts()) },
  onSelectProduct: (product) => {
    dispatch(selectProduct(product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
