import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { shape, func } from 'prop-types';
import { FormGroup, ControlLabel, Grid, Row, Col, Panel, Button, Label, Input } from 'react-bootstrap';
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';

import Select from 'Shared/Select';
import CustomInput from 'Shared/Form/CustomInput';
import { createProductCategory, clearSelected } from 'Modules/productCategories';

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
    } = this.props;

    history.push('/categoria-de-productos');
  };

  onProductCategorySubmit = (values, dispatch) => {
    const {
      history,
    } = this.props;

    console.log(values);
    if (Object.keys(values).length >= 2) {
      dispatch(createProductCategory(history, values));
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
