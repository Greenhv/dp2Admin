import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Panel, Button, Label, Input } from 'react-bootstrap';
import { Form, reduxForm, Field } from 'redux-form';

const ProductFormPage = ({ match }) => (
  <Grid fluid>
      <Row>
        <Col lg={12}>
          <Panel>
            <div>
              <Form>
                <FormGroup>
                  <ControlLabel>
                    Nombre del producto
                  </ControlLabel>
                  <FormControl
                    bsSize="small"
                    type="text"
                    placeholder="Nombre del producto"
                  >
                  </FormControl>
                  <ControlLabel>
                    Precio del producto
                  </ControlLabel>
                  <FormControl
                    bsSize="small"
                    type="text"
                    placeholder="Precio del producto"
                  >
                  </FormControl>
                  <ControlLabel>Marca</ControlLabel>
                  <FormControl componentClass="select" placeholder="Marca">
                    <option value="select">Marca 1</option>
                    <option value="other">...</option>
                  </FormControl>
                  <ControlLabel>Categoria</ControlLabel>
                  <FormControl componentClass="select" placeholder="Categoria">
                    <option value="select">Categoria 1</option>
                    <option value="other">...</option>
                  </FormControl>
                </FormGroup>
              </Form>
            </div>
          </Panel>
        </Col>
      </Row>
    </Grid>
);


ProductFormPage.propTypes = {

}

export default reduxForm({
  form: 'productForm',
})(ProductFormPage);
