import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

import DataTableWithBrands from '../containers/DataTableWithBrands.jsx';

const ListPage = () => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <DataTableWithBrands />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default ListPage;

