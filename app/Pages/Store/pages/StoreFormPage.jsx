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
import { getStoreCategories as requestCategories } from "Modules/storeCategories";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Select from "Shared/Select";
import CustomInput from "Shared/Form/CustomInput";
import { createStore } from "Modules/stores";
import { storeCategoryType } from "Pages/StoreCategory/types";

class StoreFormPage extends PureComponent {
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

  onStoreSubmit = (values, dispatch) => {
    const { history } = this.props;

    if (Object.keys(values).length >= 9) {
      dispatch(createStore(history, values));
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
                    <ControlLabel>Administrador de la tienda</ControlLabel>
                    <Field
                      name="adminId"
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
  getStoreCategories: func.isRequired
};

const mapStateToProps = ({ storeCategories: { storeCategories } }) => ({
  storeCategories
});

const mapDispatchToProps = dispatch => ({
  getStoreCategories: () => {
    dispatch(requestCategories());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "storeForm"
  })(StoreFormPage)
);
