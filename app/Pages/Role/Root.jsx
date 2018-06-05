import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ContentWrapper from 'Components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';

const Root = ({ match, location }) => (
  <ContentWrapper>
    <h3 className="header-container">
      <span>Roles</span>
    </h3>
    <Route
      exact
      path="/roles"
      component={ListPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
}

export default Root;
