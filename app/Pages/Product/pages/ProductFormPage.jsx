import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { shape, func, arrayOf } from "prop-types";
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
import { getProductCategories as requestCategories } from "Modules/productCategories";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Select from "Shared/Select";
import CustomInput from "Shared/Form/CustomInput";
import { createProduct } from "Modules/products";
import { productCategoryType } from "Pages/ProductCategory/types";

class ProductFormPage extends PureComponent {
  componentWillMount() {
    const { getProductCategories } = this.props;
    const element = ReactDOM.findDOMNode(this.form);

    console.log(getProductCategories)
    getProductCategories();
    $(element).parsley();
  }

  goToProductsPage = () => {
    const { history } = this.props;

    history.push("/productos");
  };

  onProductSubmit = (values, dispatch) => {
    const { history } = this.props;

    if (Object.keys(values).length >= 4) {
      dispatch(createProduct(history, values));
    }
  };

  render() {
    const { history, handleSubmit } = this.props;

    return (
      <Grid fluid>
        <Row>
          <Col lg={12}>
            <Panel>
              <form
                onSubmit={handleSubmit(this.onProductSubmit)}
                noValidate
                ref={node => {
                  this.form = node;
                }}
              >
                <Panel.Body>
                  <FormGroup>
                    <ControlLabel>Nombre del producto</ControlLabel>
                    <Field
                      name="name"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Nombre del producto",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Precio del producto</ControlLabel>
                    <Field
                      name="price"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Precio del producto",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Marca</ControlLabel>
                    <Field
                      name="brand"
                      type="select"
                      component={Select}
                      props={{
                        placeholder: "Seleccione una marca",
                        options: [
                          { value: "1", label: "Marca 1" },
                          { value: "2", label: "Marca 2" }
                        ],
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Categoria</ControlLabel>
                    <Field
                      name="category"
                      component={Select}
                      props={{
                        placeholder: "Seleccionar una categoria",
                        options: this.props.productCategories.map(
                          productCategory => ({
                            value: productCategory.id,
                            label: productCategory.name
                          })
                        ),
                        required: "required"
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

ProductFormPage.defaultProps = {
  productCategories: []
};

ProductFormPage.propTypes = {
  history: shape({}).isRequired,
  productCategories: arrayOf(productCategoryType),
  getProductCategories: func.isRequired
};

const mapStateToProps = ({ productCategories: { productCategories }}) => ({
  productCategories
})

const mapDispatchToProps = dispatch => ({
  getProductCategories: () => {
    dispatch(requestCategories())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "productForm"
  })(ProductFormPage)
);
