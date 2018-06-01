import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";

import DataTableWithStoreCategories from "../containers/DataTableWithStoreCategories.jsx";

const ListPage = ({ match }) => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <DataTableWithStoreCategories />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default ListPage;
