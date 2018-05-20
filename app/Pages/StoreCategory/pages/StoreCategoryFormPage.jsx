import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Panel, Button, Label, Input } from 'react-bootstrap';
import { Form, reduxForm, Field } from 'redux-form';

let StoreCategoryForm  = props => {
  const { handleSubmit } = props
  return 
  <form onSubmit={handleSubmit}>

  </form>
}

const StoreCategoryFormPage = () => {
  return (
    <Grid fluid>
    <Row>
      <Col lg={12}>
        <Panel>
          <div>
            2
          </div>
          <DataTableWithStoreCategories />
        </Panel>
      </Col>
    </Row>
  </Grid>
  )
}

StoreCategoryFormPage.propTypes = {

}

export default StoreCategoryFormPage;
