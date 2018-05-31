import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { shape, func } from 'prop-types';
import { FormGroup, ControlLabel, Grid, Row, Col, Panel, Button, Label, Input } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';

import Select from 'Shared/Select';
import CustomInput from 'Shared/Form/CustomInput';
import { addProductCategory } from 'Modules/productCategories';

class ProductCategoryFormPage extends PureComponent {
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.form);

    $(element).parsley();
  }

  goToProductsPage = () => {
    const {
      history,
    } = this.props;

    history.push('/categoria-de-productos');
  };

  onProductCategorySubmit = (values, dispatch) => {
    const {
      history,
    } = this.props;

    console.log(values);
    if (Object.keys(values).length >= 2) {
      fetch(`${process.env.API_BASE_URL}/product_categories`, {
        method: 'POST',
        body: JSON.stringify(values), 
        headers: {
          'content-type': 'application/json',
        },
      }).then(response => response.json())
      .then((data) => {
        dispatch(addProductCategory(data.product_category));
        history.push('/categoria-de-productos');
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
              <form onSubmit={handleSubmit(this.onProductCategorySubmit)} noValidate ref={(node) => { this.form = node; }}>
                <Panel.Body>
                    <FormGroup>
                      <ControlLabel>Category</ControlLabel>
                      <Field
                        name="name"
                        component={CustomInput}
                        type="text"
                        props={{ placeholder: 'Nombre de la categoria', required: 'required' }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Descripción de la Categoría</ControlLabel>
                      <Field
                        name="price"
                        component={CustomInput}
                        componentClass="textarea"
                        type="text"
                        props={{ placeholder: 'Ingrese la descripción de su categoría', required: 'required' }}
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

ProductCategoryFormPage.propTypes = {
  history: shape({}).isRequired,
}

export default reduxForm({
  form: 'productCategoryForm',
})(ProductCategoryFormPage);
