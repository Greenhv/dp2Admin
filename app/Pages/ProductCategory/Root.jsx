import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import ContentWrapper from '../../components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';
import ProductCategoryFormPage from './pages/ProductCategoryFormPage';

const Root = ({ match }) => (
  <ContentWrapper>
    <h3>Productos</h3>
    <Route
      exact
      path={match.url}
      component={ListPage}
    />
    <Route
      exact
      path={`${match.url}/nuevo`}
      component={ProductCategoryFormPage}
    />
    <Route
      exact
      path={`${match.url}/editar/:id`}
      component={ProductCategoryFormPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

export default Root;
