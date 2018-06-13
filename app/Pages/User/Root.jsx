import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ContentWrapper from 'Components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';
import UserFormPage from './pages/UserFormPage';

const Root = ({ match, location }) => (
  <ContentWrapper>
    <h3 className="header-container">
      <span>Usuarios</span>
      <div>
        { match.url === location.pathname && (
          <Link to="/usuarios/nuevo">
            <Button> Nuevo usuario</Button>
          </Link>
        )}
      </div>
    </h3>
    <Route
      exact
      path="/usuarios"
      component={ListPage}
    />
    <Route
      exact
      path="/usuarios/nuevo"
      component={UserFormPage}
    />
    <Route
      exact
      path="/usuarios/editar/:id"
      component={UserFormPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
}

export default Root;
