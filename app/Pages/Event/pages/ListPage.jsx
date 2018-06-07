import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

import DataTableWithEvents from '../containers/DataTableWithEvents.jsx';

const ListPage = () => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <DataTableWithEvents />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default ListPage;
