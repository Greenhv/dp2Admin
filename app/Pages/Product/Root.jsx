import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import ContentWrapper from '../../components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';
import ProductFormPage from './pages/ProductFormPage';

class Root extends PureComponent {
  state = {
    selectedProduct: {},
  };

  selectProduct = (product) => {
    this.setState({
      selectedProduct: product,
    });
  };

  render() {
    const {
      match,
    } = this.props;
    const {
      selectedProduct,
    } = this.state;

    return (
      <ContentWrapper>
        <h3>Productos</h3>
        <Route
          exact
          path={match.url}
          render={props => <ListPage {...props} onSelectElement={this.selectProduct} />}
        />
        <Route
          exact
          path={`${match.url}/nuevo`}
          component={ProductFormPage}
        />
        <Route
          exact
          path={`${match.url}/editar`}
          render={props => <ProductFormPage {...props} product={selectedProduct} />}
        />
      </ContentWrapper>
    );
  }
}

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

export default Root;
