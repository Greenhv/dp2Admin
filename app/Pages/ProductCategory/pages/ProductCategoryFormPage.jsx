import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { shape, func } from 'prop-types';
import { FormGroup, ControlLabel, Grid, Row, Col, Panel, Button, Label, Input } from 'react-bootstrap';
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';

import Select from 'Shared/Select';
import CustomInput from 'Shared/Form/CustomInput';
import {
  createProductCategory as createProductCategoryAction,
  clearSelected,
  updateProductCategory as updateProductCategoryAction,
} from 'Modules/productCategories';

class ProductCategoryFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    if (Object.keys(params).length < 1) {
      props.removeSelected();
    }
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.form);

    $(element).parsley();
  }

  goToProductsPage = () => {
    const {
      history,
      removeSelected,
    } = this.props;

    removeSelected();
    history.push('/categoria-de-productos');
  };

  createProductCategory = (values, dispatch) => {
    const { history } = this.props;

    swal({
      title: 'Se esta creando su categoria de producto',
      text: 'Espere por favor',
      onOpen: () => {
        swal.showLoading()
      }
    });
    dispatch(createProductCategoryAction(history, values));
  }

  updateProductCategory = (values, dispatch, id) => {
    const { history } = this.props;

    swal({
      title: 'Se esta actualiazando su categoria de producto',
      text: 'Espere por favor',
      onOpen: () => {
        swal.showLoading()
      }
    });
    dispatch(updateProductCategoryAction(history, values, id));
  }

  onProductCategorySubmit = (values, dispatch) => {
    const isFormValid = $(this.form).parsley().isValid();
    const params = this.props.match.params;

    this.props.removeSelected();
    if (isFormValid && !params.id) {
      this.createProductCategory(values, dispatch);
    } else if (isFormValid && params.id) {
      this.updateProductCategory(values, dispatch, params.id);
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
                    <ControlLabel>Categoria de Productos</ControlLabel>
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
                      name="description"
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
  removeSelected: func.isRequired,
}

const mapStateToProps = ({ productCategories: { selectedCategory } }) => ({
  initialValues: selectedCategory.id ? selectedCategory : {},
});

const mapDispatchToProps = dispatch => ({
  removeSelected: () => {
    dispatch(clearSelected());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'productCategoryForm',
  })(ProductCategoryFormPage)
);
