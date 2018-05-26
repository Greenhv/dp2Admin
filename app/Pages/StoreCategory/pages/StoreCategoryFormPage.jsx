import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { shape, func } from "prop-types";
import {
  FormGroup,
  ControlLabel,
  Grid,
  Row,
  Col,
  Panel,
  Button,
  Label,
  Input
} from "react-bootstrap";
import { reduxForm, Field } from "redux-form";

import Select from "Shared/Select";
import CustomInput from "Shared/Form/CustomInput";
import { addStoreCategory } from "Modules/products";

let StoreCategoryForm = props => {
  const { handleSubmit } = props;
  return;
  <form onSubmit={handleSubmit} />;
};

const StoreCategoryFormPage = () => {
  return (
    <Grid fluid>
      <Row>
        <Col lg={12}>
          <Panel>
            <div>store_categories 2</div>
          </Panel>
        </Col>
      </Row>
    </Grid>
  );
};

StoreCategoryFormPage.propTypes = {};

export default StoreCategoryFormPage;
