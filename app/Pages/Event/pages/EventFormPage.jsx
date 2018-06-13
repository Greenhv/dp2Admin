import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { shape, func, arrayOf } from "prop-types";
import {
  FormGroup,
  ControlLabel,
  Radio,
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
import {
  createEvent as createEventAction,
  updateEvent as updateEventAction,
  clearSelected,
} from "Modules/events";
import { eventType } from "Pages/Event/types";

class EventFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    if (!params.id) {
      props.removeSelected();
    }
  }

  goToEventsPage = () => {
    const { history } = this.props;

    history.push("/eventos");
  };

  createEvent = (values, dispatch) => {
    const { history } = this.props;

    swal({
      title: 'Se esta creando su evento',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(createEventAction(history, values));
  }

  updateEvent = (values, dispatch, id) => {
    const { history } = this.props;

    swal({
      title: 'Se esta actualiazando su evento',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(updateEventAction(history, values, id));
  }

  onEventSubmit = (values, dispatch) => {
    const isFormValid = $(this.form).parsley().isValid();
    const params = this.props.match.params;

    if (isFormValid && !params.id) {
      this.createEvent(values, dispatch);
    } else if (isFormValid && params.id) {
      this.updateEvent(values, dispatch, params.id);
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
                onSubmit={handleSubmit(this.onEventSubmit)}
                noValidate
                ref={node => {
                  this.form = node;
                }}
              >
                <Panel.Body>
                  <FormGroup>
                    <ControlLabel>Nombre del evento</ControlLabel>
                    <Field
                      name="name"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Nombre del evento",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Ubicacion del evento</ControlLabel>
                    <Field
                      name="location"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: "Localizacion del evento",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Fecha</ControlLabel>
                    <Field
                      name="event_date"
                      component={DatePicker}
                      props={{
                        placeholder: "Fecha del evento",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>¿Todo el día?</ControlLabel>
                    <br></br>
                    <Radio name='all_day' type='integer' inline
                    value={true}>Sí</Radio>{' '}
                    <br></br>
                    <Radio name='all_day' type='integer' inline
                    value={true}>No</Radio>{' '}
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Hora de Inicio</ControlLabel>
                    <Field
                      name="initial_time"
                      component={CustomInput}
                      props={{
                        placeholder: "Hora de inicio del evento",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Hora de Fin</ControlLabel>
                    <Field
                      name="final_time"
                      component={CustomInput}
                      props={{
                        placeholder: "Hora de fin del evento",
                        required: "required"
                      }}
                    />
                  </FormGroup>
                </Panel.Body>
                <Panel.Footer>
                  <div className="form-footer">
                    <div className="form-button">
                      <Button onClick={this.goToEventsPage}>Cancelar</Button>
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

EventFormPage.defaultProps = {
};

EventFormPage.propTypes = {
  history: shape({}).isRequired,
  removeSelected: func.isRequired,
};

const mapStateToProps = ({ events: { selectedEvent }}) => ({
  initialValues: selectedEvent.id ? selectedEvent : {},
})

const mapDispatchToProps = dispatch => ({
  removeSelected: () => {
    dispatch(clearSelected());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'eventForm',
  })(EventFormPage)
);
