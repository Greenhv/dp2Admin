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
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Select from "Shared/Select";
import CustomInput from "Shared/Form/CustomInput";
import { getBrands as requestBrands } from "Modules/brands";
import { getProductCategories as requestCategories } from "Modules/productCategories";
import {
  createProduct as createProductAction,
  updateProduct as updateProductAction,
  clearSelected,
} from "Modules/products";
import { productCategoryType } from "Pages/ProductCategory/types";
import { productType } from "Pages/Product/types";
import { brandType } from "Pages/Brand/types";

class ProductFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    if (!params.id) {
      props.removeSelected();
    }
  }

  componentWillMount() {
    const { getProductCategories, getBrands } = this.props;
    const element = ReactDOM.findDOMNode(this.form);

    getBrands();
    getProductCategories();
    $(element).parsley();
  }

  goToProductsPage = () => {
    const { history } = this.props;

    history.push("/productos");
  };

  createProduct = (values, dispatch) => {
    const { history } = this.props;

    swal({
      title: 'Se esta creando su producto',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(createProductAction(history, values));
  }

  updateProduct = (values, dispatch, id) => {
    const { history } = this.props;

    swal({
      title: 'Se esta actualiazando su producto',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(updateProductAction(history, values, id));
  }

  onProductSubmit = (values, dispatch) => {
    const isFormValid = $(this.form).parsley().isValid();
    const params = this.props.match.params;

    if (isFormValid && !params.id) {
      this.createProduct(values, dispatch);
    } else if (isFormValid && params.id) {
      this.updateProduct(values, dispatch, params.id);
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
                        options: this.props.brands.map(
                          brand => ({
                            value: brand.id,
                            label: brand.name,
                          })
                        ),
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
                            label: productCategory.name,
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
  productCategories: [],
  brands: [],
};

ProductFormPage.propTypes = {
  history: shape({}).isRequired,
  productCategories: arrayOf(productCategoryType),
  brands: arrayOf(brandType),
  getBrands: func.isRequired,
  getProductCategories: func.isRequired,
  removeSelected: func.isRequired,
};

const mapStateToProps = ({ products: { selectedProduct }, productCategories: { productCategories }, brands: { brands }}) => ({
  brands,
  productCategories,
  initialValues: selectedProduct.id ? {
    ...selectedProduct,
    category: selectedProduct.product_category.id,
    brand: selectedProduct.brand.id,
  } : {},
})

const mapDispatchToProps = dispatch => ({
  getProductCategories: () => {
    dispatch(requestCategories())
  },
  getBrands: () => {
    dispatch(requestBrands())
  },
  removeSelected: () => {
    dispatch(clearSelected());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "productForm",
    enableReinitialize: true
  })(ProductFormPage)
);
