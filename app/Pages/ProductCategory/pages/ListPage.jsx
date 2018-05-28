import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

import DataTableWithProducts from '../containers/DataTableWithProductCategories.jsx';

const ListPage = ({ match }) => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <DataTableWithProducts />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default ListPage;
