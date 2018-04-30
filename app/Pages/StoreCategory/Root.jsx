import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import ContentWrapper from 'Components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';
import StoreCategoryFormPage from './pages/StoreCategoryFormPage';

const Root = ({ match }) => (
  <ContentWrapper>
    <h3>Categorias de Tiendas</h3>
    <Route
      exact
      path={match.url}
      component={ListPage}
    />
    <Route
      exact
      path={`${match.url}/nuevo`}
      component={StoreCategoryFormPage}
    />
    <Route
      exact
      path={`${match.url}/editar`}
      component={StoreCategoryFormPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

export default Root;
