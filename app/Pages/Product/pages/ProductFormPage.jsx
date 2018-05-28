import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { shape, func } from 'prop-types';
import { FormGroup, ControlLabel, Grid, Row, Col, Panel, Button, Label, Input } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

import Select from 'Shared/Select';
import CustomInput from 'Shared/Form/CustomInput';
import { addProduct } from 'Modules/products';


class ProductFormPage extends PureComponent {
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.form);

    $(element).parsley();
  }

  goToProductsPage = () => {
    const {
      history,
    } = this.props;

    history.push('/produtos');
  };

  onProductSubmit = (values, dispatch) => {
    const {
      history
    } = this.props;

    if (Object.keys(values).length >= 4) {
      fetch(`${process.env.API_BASE_URL}products`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        },
      }).then(response => response.json())
      .then((data) => {
        dispatch(addProduct(data.product));
        history.push('/productos');
      });
    }
  }

  render() {
    const {
      history,
      handleSubmit,
    } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col lg={12}>
            <Panel>
              <form onSubmit={handleSubmit(this.onProductSubmit)} noValidate ref={(node) => { this.form = node; }}>
                <Panel.Body>
                    <FormGroup>
                      <ControlLabel>Nombre del producto</ControlLabel>
                      <Field
                        name="name"
                        component={CustomInput}
                        type="text"
                        props={{ placeholder: 'Nombre del producto', required: 'required' }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Precio del producto</ControlLabel>
                      <Field
                        name="price"
                        component={CustomInput}
                        type="text"
                        props={{ placeholder: 'Precio del producto', required: 'required' }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Marca</ControlLabel>
                      <Field
                        name="brand"
                        type="select"
                        component={Select}
                        props={{
                          placeholder: 'Seleccione una marca',
                          options: [{ value: '1', label: 'Marca 1' }, { value: '2', label: 'Marca 2' }],
                          required: 'required',
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Categoria</ControlLabel>
                      <Field
                        name="category"
                        component={Select}
                        props={{
                          placeholder: 'Seleccionar una categoria',
                          options: [{ value: 'ct1', label: 'Categoria 1' }, { value: 'ct2', label: 'Categoria 2' }],
                          required: 'required',
                        }}
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
              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ProductFormPage.propTypes = {
  history: shape({}).isRequired,
};

export default reduxForm({
  form: 'productForm',
})(ProductFormPage);
