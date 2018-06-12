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
import {
  createBrand as createBrandAction,
  updateBrand as updateBrandAction,
  clearSelected
} from "Modules/brands";
import { brandType } from "Pages/Brand/types";

class BrandFormPage extends PureComponent {
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

  goToBrandsPage = () => {
    const { history } = this.props;

    history.push("/marcas");
  };

  createBrand = (values, dispatch) => {
    const { history } = this.props;

    swal({
      title: "Se esta creando su marca",
      text: "Espere por favor",
      onOpen: () => {
        swal.showLoading();
      }
    });

    dispatch(createBrandAction(history, values));
  };

  updateBrand = (values, dispatch, id) => {
    const { history } = this.props;

    swal({
      title: "Se esta actualiazando su marca",
      text: "Espere por favor",
      onOpen: () => {
        swal.showLoading();
      }
    });

    dispatch(updateBrandAction(history, values, id));
  };

  onBrandSubmit = (values, dispatch) => {
    const isFormValid = $(this.form)
      .parsley()
      .isValid();
    const params = this.props.match.params;

    if (isFormValid && !params.id) {
      this.createBrand(values, dispatch);
    } else if (isFormValid && !params.id) {
      this.updateBrand(values, dispatch, params.id);
    }
  };

  render() {
    const { history, handleSubmit } = this.props;

    return (
      <Grid fluid>
        <Row lg={12}>
          <Panel>
            <form
              onSubmit={handleSubmit(this.onBrandSubmit)}
              noValidate
              ref={node => {
                this.form = node;
              }}
            >
              <Panel.Body>
                <FormGroup>
                  <ControlLabel>Marca</ControlLabel>
                  <Field
                    name="name"
                    component={CustomInput}
                    type="text"
                    props={{
                      placeholder: "Nombre de la marca",
                      required: "required"
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Corporacion</ControlLabel>
                  <Field
                    name="corporation_name"
                    component={CustomInput}
                    type="text"
                    props={{
                      placeholder: "Nombre de la corporacion",
                      required: "required"
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Descripción de la Marca</ControlLabel>
                  <Field
                    name="description"
                    component={CustomInput}
                    componentClass="textarea"
                    type="text"
                    props={{
                      placeholder: "Ingrese la descripción de su marca",
                      required: "required"
                    }}
                  />
                </FormGroup>
              </Panel.Body>
              <Panel.Footer>
                <div className="form-footer">
                    <div className="form-button">
                      <Button onClick={this.goToBrandsPage}>Cancelar</Button>
                    </div>
                    <div className="form-button">
                      <Button type="submit">Crear</Button>
                    </div>
                </div>
              </Panel.Footer>
            </form>
          </Panel>
        </Row>
      </Grid>
    );
  }
}

BrandFormPage.propTypes = {
  history: shape({}).isRequired,
  removeSelected: func.isRequired,
}

const mapStateToProps = ({ brands: {selectedBrand } }) => ({
  initialValues: selectedBrand.id ? selectedBrand: {},
})

const mapDispatchToProps = dispatch => ({
  removeSelected: () => {
    dispatch(clearSelected());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'brandForm',
  })(BrandFormPage)
);
