import React from "react";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";

import DataTableWithUsers from "../containers/DataTableWithUsers.jsx";

const ListPage = ({ match }) => (
  <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <DataTableWithUsers />
        </Panel>
      </Col>
    </Row>
  </Grid>
);

export default ListPage;
