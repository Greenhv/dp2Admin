import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { shape, func } from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  Grid,
  Row,
  Col,
  Panel,
  Button,
  Label,
  Input,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import {
  createUser as createUserAction,
  updateUser as updateUserAction,
  clearSelected,
} from 'Modules/users';
import { getRoles as requestRoles } from 'Modules/roles';
import Select from 'Shared/Select';
import CustomInput from 'Shared/Form/CustomInput';
import objectToFormData from 'Utils/objectToFormData';

class UserFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    props.getRoles();
    if (Object.keys(params).length < 1) {
      props.removeSelected();
    }
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.form);
    $(element).parsley();
  }

  goToUsersPage = () => {
    const { history } = this.props;
    history.push('/usuarios');
  };

  createUser = (values, dispatch) => {
    const { history } = this.props;

    const finalData = objectToFormData(values, null, 'user');
    swal({
      title: 'Se esta creando su usuario',
      text: 'Espere por favor',
      onOpen: () => {
        swal.showLoading();
      },
    });
    dispatch(createUserAction(history, finalData));
  };

  updateUser = (values, dispatch, id) => {
    const { history } = this.props;

    const finalData = objectToFormData(values, null, 'user');
    swal({
      title: 'Se esta actualiazando su usuario',
      text: 'Espere por favor',
      onOpen: () => {
        swal.showLoading();
      },
    });
    dispatch(updateUserAction(history, finalData, id));
  };

  onUserSubmit = (values, dispatch) => {
    const isFormValid = $(this.form)
      .parsley()
      .isValid();
    const params = this.props.match.params;

    console.log(values);
    if (isFormValid && !params.id) {
      this.createUser(values, dispatch);
    } else if (isFormValid && params.id) {
      this.updateUser(values, dispatch, params.id);
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
                onSubmit={handleSubmit(this.onUserSubmit)}
                noValidate
                ref={node => {
                  this.form = node;
                }}
              >
                <Panel.Body>
                  <FormGroup>
                    <ControlLabel>Nombre del usuario</ControlLabel>
                    <Field
                      name="first_name"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: 'Nombres del usuario',
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Apellidos del usuario</ControlLabel>
                    <Field
                      name="last_name"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: 'Apellidos del usuario',
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Email del usuario</ControlLabel>
                    <Field
                      name="email"
                      component={CustomInput}
                      type="email"
                      props={{
                        placeholder: 'Ingrese el email del usuario',
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Contraseña del usuario</ControlLabel>
                    <Field
                      name="password"
                      component={CustomInput}
                      type="text"
                      props={{
                        placeholder: 'Ingrese la contraseña del usuario',
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Rol del usuario</ControlLabel>
                    <Field
                      name="role_id"
                      component={Select}
                      props={{
                        placeholder: 'Seleccione un rol',
                        options: this.props.roles.map(role => ({
                          value: role.id,
                          label: role.name,
                        })),
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                </Panel.Body>
                <Panel.Footer>
                  <div className="form-footer">
                    <div className="form-button">
                      <Button onClick={this.goToUsersPage}>Cancelar</Button>
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

UserFormPage.propTypes = {
  history: shape({}).isRequired,
  removeSelected: func.isRequired,
  requestRoles: func.isRequired,
};

const mapStateToProps = ({ roles: { roles }, users: { selectedUser } }) => ({
  roles,
  initialValues: selectedUser.id ? selectedUser : {},
});

const mapDispatchToProps = dispatch => ({
  removeSelected: () => {
    dispatch(clearSelected());
  },
  getRoles: () => {
    dispatch(requestRoles());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'userForm',
  })(UserFormPage)
);
