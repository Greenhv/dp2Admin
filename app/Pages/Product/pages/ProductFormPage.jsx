import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { shape, func } from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Panel, Button, Label, Input } from 'react-bootstrap';
import { Form, reduxForm, Field } from 'redux-form';

import Select from 'Shared/Select';

class ProductFormPage extends PureComponent {
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.form);

    $(element).parsley();
  }

  goToProductsPage = () => {
    const {
      history,
    } = this.props;

    history.push('/productos');
  };

  onProductSubmit = (values) => {
    console.log(values);
    // fetch(`${process.env.API_BASE_URL}/products`, {
      // method: 'POST',
      // data: values.data,
    // })
     // this.goToProductsPage();
    
  }

  render() {
    const {
      history,
    } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col lg={12}>
            <Panel>
              <Form onSubmit={this.onProductSubmit} noValidate ref={(node) => { this.form = node; }}>
                <Panel.Body>
                    <FormGroup>
                      <ControlLabel>Nombre del producto</ControlLabel>
                      <Field
                        name="name"
                        component={FormControl}
                        type="text"
                        props={{ placeholder: 'Nombre del producto', required: 'required' }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Precio del producto</ControlLabel>
                      <Field
                        name="price"
                        component={FormControl}
                        type="text"
                        props={{ placeholder: 'Precio del producto' }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Marca</ControlLabel>
                      <Field
                        name="brand"
                        type="select"
                        component={Select}
                        props={{ placeholder: 'Seleccione una marca', options: [{ value: '1', label: 'Marca 1' }, { value: '2', label: 'Marca 2' }] }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Categoria</ControlLabel>
                      <Field
                        name="category"
                        component={Select}
                        props={{ placeholder: 'Seleccionar una categoria', options: [{ value: 'ct1', label: 'Categoria 1' }, { value: 'ct2', label: 'Categoria 2' }] }}
                      />
                    </FormGroup>
                </Panel.Body>
                <Panel.Footer>
                  <div className="form-footer">
                    <div className="form-button">
                      <Button onClick={this.goToProductsPage}>Cancelar</Button>
                    </div>
                    <div className="form-button">
                      <Button type="submit">Crear</Button>
                    </div>
                  </div>
                </Panel.Footer>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ProductFormPage.defaultProps = {
  onProductSubmit: null,
};

ProductFormPage.propTypes = {
  history: shape({}).isRequired,
  onProductSubmit: func,
};

export default reduxForm({
  form: 'productForm',
})(ProductFormPage);
