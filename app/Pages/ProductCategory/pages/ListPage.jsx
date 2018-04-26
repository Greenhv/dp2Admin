import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

import DataTableWithProducts from '../containers/DataTableWithProducts.jsx';

const ListPage = ({ match }) => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <div>
            <Link to={`${match.url}/nuevo`}>
              <Button>Nuevo Producto</Button>
            </Link>
          </div>
          <DataTableWithProducts />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default ListPage;
