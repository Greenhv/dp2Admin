import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import ContentWrapper from 'Components/Layout/ContentWrapper'
import ErrorHandler from 'Shared/ErrorHandler';
import ListPage from './pages/ListPage';
import ProductFormPage from './pages/ProductFormPage';

const Root = ({ match }) => (
  <ContentWrapper>
    <h3>Productos</h3>
    <Route
      exact
      path={match.url}
      component={props => (
        <ErrorHandler>
          <ListPage {...props} />
        </ErrorHandler>
      )}
    />
    <Route
      exact
      path={`${match.url}/nuevo`}
      component={props => (
        <ErrorHandler>
          <ProductFormPage {...props} />
        </ErrorHandler>
      )}
    />
    <Route
      exact
      path={`${match.url}/:id/editar`}
      component={props => (
        <ErrorHandler>
          <ProductFormPage {...props} />
        </ErrorHandler>
      )}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

export default Root;
