import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ContentWrapper from 'Components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';
import StoreCategoryFormPage from './pages/StoreCategoryFormPage';

const Root = ({ match, location }) => (
  <ContentWrapper>
    <h3 className="header-container">
      <span>Categoria de tiendas</span>
      <div>
        { match.url === location.pathname && (
          <Link to={`${match.url}/nuevo`}>
            <Button> Nueva categoría</Button>
          </Link>
        )}
      </div>
    </h3>
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
      path={`${match.url}/:id/editar`}
      component={StoreCategoryFormPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
}

export default Root;
