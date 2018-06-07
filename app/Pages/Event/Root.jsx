import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ContentWrapper from 'Components/Layout/ContentWrapper'
import ErrorHandler from 'Shared/ErrorHandler';
import ListPage from './pages/ListPage';
import EventFormPage from './pages/EventFormPage';

const Root = ({ match, location }) => (
  <ContentWrapper>
    <h3 className="header-container">
      <span>Evento</span>
      <div>
        { match.url === location.pathname && (
          <Link to="/eventos/nuevo">
            <Button>Nuevo Evento</Button>
          </Link>
        ) }
      </div>
    </h3>
    <Route
      exact
      path="/eventos"
      component={ListPage}
    />
    <Route
      exact
      path="/eventos/nuevo"
      component={EventFormPage}
    />
    <Route
      exact
      path="/eventos/editar/:id"
      component={EventFormPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
}

export default Root;
