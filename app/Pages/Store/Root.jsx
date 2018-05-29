import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ContentWrapper from 'Components/Layout/ContentWrapper'
import ErrorHandler from 'Shared/ErrorHandler'
import ListPage from './pages/ListPage';
import StoreFormPage from './pages/StoreFormPage';

const Root = ({ match, location }) => (
  <ContentWrapper>
    <h3 className="header-container">
      <span>Tienda</span>
      <div>
        { match.url === location.pathname && (
          <Link to={`${match.url}/nuevo`}>
            <Button>Nueva tienda</Button>
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
      component={StoreFormPage}
    />
    <Route
      exact
      path={`${match.url}/editar`}
      component={StoreFormPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
}

export default Root;
