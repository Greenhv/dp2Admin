import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ContentWrapper from 'Components/Layout/ContentWrapper';
import ErrorHandler from 'Shared/ErrorHandler';
import ListPage from './pages/ListPage';
import ProductCategoryFormPage from './pages/ProductCategoryFormPage';

const Root = ({ match, location }) => (
  <ContentWrapper>
    <h3 className="header-container">
      <span>Categorias de Productos</span>
      <div>
        { match.url === location.pathname && (
          <Link to={`${match.url}/nuevo`}>
            <Button>Nueva Categoria de Productos</Button>
          </Link>
        ) }
      </div>
    </h3>
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
          <ProductCategoryFormPage {...props} />
        </ErrorHandler>
      )}
    />
    <Route
      exact
      path={`${match.url}/editar/:id`}
      component={props => (
        <ErrorHandler>
          <ProductCategoryFormPage {...props} />
        </ErrorHandler>
      )}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
}

export default Root;
