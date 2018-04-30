
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

import DataTableWithStoreCategories from '../containers/DataTableWithStoreCategories.jsx';

const ListPage = ({ match }) => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <div>
            <Link to={`${match.url}/nuevo`}>
              <Button>Nueva Categoria de Tienda</Button>
            </Link>
          </div>
          <DataTableWithStoreCategories />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

ListPage.propTypes = {

}

export default ListPage;

