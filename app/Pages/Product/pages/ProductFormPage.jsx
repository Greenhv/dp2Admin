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
import DropZone from 'Shared/Form/DropZone';
import { getStores as requestStores } from "Modules/stores";
import { getBrands as requestBrands } from "Modules/brands";
import { getProductCategories as requestCategories } from "Modules/productCategories";
import {
  createProduct as createProductAction,
  updateProduct as updateProductAction,
  clearSelected,
} from "Modules/products";
import { productCategoryType } from "Pages/ProductCategory/types";
import { brandType } from "Pages/Brand/types";
import { storeType } from "Pages/Store/types";

class ProductFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    if (!params.id) {
      props.removeSelected();
    }
  }

  componentWillMount() {
    const { getProductCategories, getBrands, getStores } = this.props;
    const element = ReactDOM.findDOMNode(this.form);

    getBrands();
    getProductCategories();
    getStores();
    $(element).parsley();
  }

  goToProductsPage = () => {
    const { history } = this.props;

    history.push("/productos");
  };

  createProduct = (values, dispatch) => {
    const { history } = this.props;
    const data = new FormData();

    Object.keys(values).map(key => {
      if (key !== 'image') {
        data.append(key, values[key]);
      } else {
        data.append(key, values[key][0]);
      }
    });

    // console.log(values);
    swal({
      title: 'Se esta creando su producto',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(createProductAction(history, data));
  }

  updateProduct = (values, dispatch, id) => {
    const { history } = this.props;
    const data = new FormData();
    let newValues = {
      ...values,
      technical_specification_attributes: {
        description: values.description,
        weight: values.weight,
        height: values.height,
        length: values.length,
      }
    }

    Object.keys(newValues).map(key => {
      if (key !== 'image') {
        data.append(key, newValues[key]);
      } else {
        data.append(key, newValues[key][0]);
      }
    });

    swal({
      title: 'Se esta actualiazando su producto',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(updateProductAction(history, data, id));
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
                      name="brand_id"
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
                      name="product_category_id"
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
                  <FormGroup>
                    <ControlLabel>Tienda</ControlLabel>
                    <Field
                      name="store_id"
                      component={Select}
                      props={{
                        placeholder: "Seleccionar una categoria",
                        options: this.props.stores.map(
                          store => ({
                            value: store.id,
                            label: store.name,
                          })
                        ),
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Información Técnica</ControlLabel>
                    <Field
                      name="description"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Descripción del producto",
                        required: "required"
                      }}
                    />
                    <Field
                      name="weight"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Peso del producto",
                        required: "required"
                      }}
                    />
                    <Field
                      name="length"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Largo del producto",
                        required: "required"
                      }}
                    />
                    <Field
                      name="height"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Alto del producto",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Imagen</ControlLabel>
                    <Field
                      name="image"
                      component={DropZone}
                      props={{
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
  stores: arrayOf(storeType),
  getBrands: func.isRequired,
  getProductCategories: func.isRequired,
  removeSelected: func.isRequired,
};

const mapStateToProps = ({
  products: { selectedProduct },
  productCategories: { productCategories },
  brands: { brands },
  stores: { stores },
}) => ({
  brands,
  productCategories,
  stores,
  initialValues: selectedProduct.id ? {
    ...selectedProduct,
    product_category_id: selectedProduct.product_category.id,
    brand_id: selectedProduct.brand.id,
    store_id: selectedProduct.store.id,
    description: selectedProduct.technical_specification.description,
    weight: selectedProduct.technical_specification.weight,
    length: selectedProduct.technical_specification.length,
    height: selectedProduct.technical_specification.height,
  } : {},
})

const mapDispatchToProps = dispatch => ({
  getProductCategories: () => {
    dispatch(requestCategories());
  },
  getBrands: () => {
    dispatch(requestBrands());
  },
  getStores: () => {
    dispatch(requestStores());
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
