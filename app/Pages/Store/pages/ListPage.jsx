import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

import DataTableWithStores from '../containers/DataTableWithStores.jsx';

const ListPage = ({ match }) => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <DataTableWithStores />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default ListPage;
