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
import { getStoreCategories as requestCategories } from "Modules/storeCategories";
import {
  createStore as createStoreAction,
  clearSelected,
  updateStore as updateStoreAction,
} from "Modules/stores";
import { storeCategoryType } from "Pages/StoreCategory/types";

class StoreFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    if (Object.keys(params).length < 1) {
      props.removeSelected();
    }
  }

  componentWillMount() {
    const { getStoreCategories } = this.props;
    const element = ReactDOM.findDOMNode(this.form);

    getStoreCategories();
    $(element).parsley();
  }

  goToStores = () => {
    const { history } = this.props;
    history.push("/tiendas");
  };

  createStore = (values, dispatch) => {
    const { history } = this.props;

    swal({
      title: 'Se esta creando su tienda',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(createStoreAction(history, values));
  }

  updateStore = (values, dispatch, id) => {
    const { history } = this.props;

    swal({
      title: 'Se esta actualiazando su tienda',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(updateStoreAction(history, values, id));
  }

  onStoreSubmit = (values, dispatch) => {
    const isFormValid = $(this.form).parsley().isValid();
    const params = this.props.match.params;

    if (isFormValid && !params.id) {
      this.createStore(values, dispatch);
    } else if (isFormValid && params.id) {
      this.updateStore(values, dispatch, params.id);
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
                onSubmit={handleSubmit(this.onStoreSubmit)}
                noValidate
                ref={node => {
                  this.form = node;
                }}
              >
                <Panel.Body>
                  <FormGroup>
                    <ControlLabel>Nombre de la tienda</ControlLabel>
                    <Field
                      name="name"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Nombre de la tienda",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Descripción</ControlLabel>
                    <Field
                      name="description"
                      component={CustomInput}
                      type="textarea"
                      props={{
                        placeholder: "Descripcion de la tienda",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Categorias de la tienda</ControlLabel>
                    <Field
                      name="categories_id"
                      component={Select}
                      props={{
                        placeholder: "Categorias de la tienda",
                        options: this.props.storeCategories.map(
                          storeCategory => ({
                            value: storeCategory.id,
                            label: storeCategory.name
                          })
                        ),
                        required: "required",
                        multiple: true,
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Administrador de la tienda</ControlLabel>
                    <Field
                      name="admin_id"
                      component={Select}
                      props={{
                        placeholder: "Administrador de la tienda",
                        options: this.props.storeCategories.map(
                          storeCategory => ({
                            value: storeCategory.id,
                            label: storeCategory.name
                          })
                        ),
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Página web</ControlLabel>
                    <Field
                      name="webpage"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Página de la tienda",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Nombre del contacto</ControlLabel>
                    <Field
                      name="contact_name"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Nombre del contacto",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Telefono</ControlLabel>
                    <Field
                      name="phone_number"
                      component={CustomInput}
                      type="text"
                      props={{ placeholder: "Telefono", required: "required" }}
                    />
                  </FormGroup>
                </Panel.Body>
                <Panel.Footer>
                  <div className="form-footer">
                    <div className="form-button">
                      <Button onClick={this.goToStores}>Cancelar</Button>
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

StoreFormPage.defaultProps = {
  storeCategories: []
};

StoreFormPage.propTypes = {
  history: shape({}).isRequired,
  storeCategories: arrayOf(storeCategoryType),
  getStoreCategories: func.isRequired,
  removeSelected: func.isRequired,
};

const mapStateToProps = ({ stores: { selectedStore }, storeCategories: { storeCategories } }) => ({
  storeCategories,
  initialValues: selectedStore.id ? selectedStore : {},
});

const mapDispatchToProps = dispatch => ({
  getStoreCategories: () => {
    dispatch(requestCategories());
  },
  removeSelected: () => {
    dispatch(clearSelected());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "storeForm"
  })(StoreFormPage)
);
