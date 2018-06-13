import PropTypes from "prop-types";
import moment from 'moment';
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

import DatePicker from "Shared/DateTimePicker";
import { getStores as requestStores } from "Modules/stores";
import {
  createPromotion as createPromotionAction,
  updatePromotion as updatePromotionAction,
  clearSelected,
} from "Modules/promotions";
import { storeType } from "Pages/Store/types";
import { promotionType } from "Pages/Promotion/types";

var date = moment();

class PromotionFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    if (!params.id) {
      props.removeSelected();
    }
  }

  componentWillMount() {
    const { getStores } = this.props;
    const element = ReactDOM.findDOMNode(this.form);

    getStores();
    $(element).parsley();
  }

  goToPromotionsPage = () => {
    const { history } = this.props;

    history.push("/promociones");
  };

  createPromotion = (values, dispatch) => {
    const { history } = this.props;

    swal({
      title: 'Se esta creando su promocion',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(createPromotionAction(history, values));
  }

  updatePromotion = (values, dispatch, id) => {
    const { history } = this.props;

    swal({
      title: 'Se esta actualiazando su promocion',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(updatePromotionAction(history, values, id));
  }

  onPromotionSubmit = (values, dispatch) => {
    const isFormValid = $(this.form).parsley().isValid();
    const params = this.props.match.params;

    if (isFormValid && !params.id) {
      this.createPromotion(values, dispatch);
    } else if (isFormValid && params.id) {
      this.updatePromotion(values, dispatch, params.id);
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
                onSubmit={handleSubmit(this.onPromotionSubmit)}
                noValidate
                ref={node => {
                  this.form = node;
                }}
              >
                <Panel.Body>
                  <FormGroup>
                    <ControlLabel>Fecha de inicio</ControlLabel>
                    <Field
                      name="initial_date"
                      component={DatePicker}
                      props={{
                        placeholder: 'Ingrese una fecha de inicio',
                        //placeholder: date.format("MM/DD/YYYY"),
                        required: 'required',
                      }}
                    />
                    </FormGroup>
                  <FormGroup>
                  <ControlLabel>Fecha de fin</ControlLabel>
                    <Field
                      name="final_date"
                      component={DatePicker}
                      props={{
                        placeholder: 'Ingrese una fecha de fin',
                        //placeholder: date.format("MM/DD/YYYY"),
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                  <ControlLabel>Descuento</ControlLabel>
                    <Field
                      name="value"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Valor del descuento",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Solo movil</ControlLabel>
                    <br></br>
                    <Field name="only_mobile" id="only_mobile" component="input" type="checkbox"/>
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Tienda</ControlLabel>
                    <Field
                      name="store"
                      component={Select}
                      props={{
                        placeholder: "Seleccionar una tienda",
                        options: this.props.stores.map(
                          store => ({
                            value: store.id,
                            label: store.name
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
                      <Button onClick={this.goToPromotionsPage}>Cancelar</Button>
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

PromotionFormPage.defaultProps = {
  stores: []
};

PromotionFormPage.propTypes = {
  history: shape({}).isRequired,
  stores: arrayOf(storeType),
  getStores: func.isRequired,
  removeSelected: func.isRequired,
};

const mapStateToProps = ({ promotions: { selectedPromotion }, stores: { stores }}) => ({
  stores,
  initialValues: selectedPromotion.id ? {
    ...selectedPromotion,
    store: selectedPromotion.store.id,
  } : {},
})

const mapDispatchToProps = dispatch => ({
  getStores: () => {
    dispatch(requestStores())
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
    form: "promotionForm",
    enableReinitialize: true
  })(PromotionFormPage)
);
