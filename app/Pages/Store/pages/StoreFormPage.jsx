import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { shape, func, arrayOf } from 'prop-types';
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

import objectToFormData from 'Utils/objectToFormData';
import Select from 'Shared/Select';
import DropZone from 'Shared/Form/DropZone';
import CustomInput from 'Shared/Form/CustomInput';
import { getStoreCategories as requestCategories } from 'Modules/storeCategories';
import { getUsers as requestUsers } from 'Modules/users';
import {
  createStore as createStoreAction,
  clearSelected,
  updateStore as updateStoreAction,
} from 'Modules/stores';
import { storeCategoryType } from 'Pages/StoreCategory/types';
import { userType } from 'Pages/User/types';

class StoreFormPage extends PureComponent {
  constructor(props) {
    super(props);

    const params = props.match.params;

    if (!params.id) {
      props.removeSelected();
    }
  }

  componentWillMount() {
    const { getStoreCategories, getUsers } = this.props;
    const element = ReactDOM.findDOMNode(this.form);

    getStoreCategories();
    getUsers();
    $(element).parsley();
  }

  goToStoresPage = () => {
    const { history } = this.props;
    history.push('/tiendas');
  };

  createStore = (values, dispatch) => {
    const { history } = this.props;
    const data = { ...values, banner: values.banner[0], logo: values.logo[0] };
    const finalData = objectToFormData(data, null, 'store');

    swal({
      title: 'Se esta creando su tienda',
      text: 'Espere por favor',
      onOpen: () => {
        swal.showLoading();
      },
    });
    dispatch(createStoreAction(history, finalData));
  };

  updateStore = (values, dispatch, id) => {
    const { history } = this.props;
    const data = { ...values, banner: values.banner[0], logo: values.logo[0] };
    const finalData = objectToFormData(data, null, 'store');

    swal({
      title: 'Se esta actualiazando su tienda',
      text: 'Espere por favor',
      onOpen: () => {
        swal.showLoading();
      },
    });
    dispatch(updateStoreAction(history, finalData, id));
  };

  onStoreSubmit = (values, dispatch) => {
    const isFormValid = $(this.form)
      .parsley()
      .isValid();
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
                        placeholder: 'Nombre de la tienda',
                        required: 'required',
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
                        placeholder: 'Descripcion de la tienda',
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Categorias de la tienda</ControlLabel>
                    <Field
                      name="categories_id"
                      component={Select}
                      props={{
                        placeholder: 'Categorias de la tienda',
                        options: this.props.storeCategories.map(
                          storeCategory => ({
                            value: storeCategory.id,
                            label: storeCategory.name,
                          })
                        ),
                        required: 'required',
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
                        placeholder: 'Administrador de la tienda',
                        options: this.props.users.map(user => ({
                          value: user.id,
                          label: `${user.first_name} ${user.last_name}`,
                        })),
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
                        placeholder: 'Página de la tienda',
                        required: 'required',
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
                        placeholder: 'Nombre del contacto',
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Telefono</ControlLabel>
                    <Field
                      name="phone_number"
                      component={CustomInput}
                      type="text"
                      props={{ placeholder: 'Telefono', required: 'required' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Logo</ControlLabel>
                    <Field
                      name="logo"
                      component={DropZone}
                      props={{
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Banner</ControlLabel>
                    <Field
                      name="banner"
                      component={DropZone}
                      props={{
                        required: 'required',
                      }}
                    />
                  </FormGroup>
                </Panel.Body>
                <Panel.Footer>
                  <div className="form-footer">
                    <div className="form-button">
                      <Button onClick={this.goToStoresPage}>Cancelar</Button>
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
  storeCategories: [],
};

StoreFormPage.propTypes = {
  history: shape({}).isRequired,
  storeCategories: arrayOf(storeCategoryType),
  users: arrayOf(userType),
  getStoreCategories: func.isRequired,
  removeSelected: func.isRequired,
  getUsers: func.isRequired,
};

const mapStateToProps = ({
  stores: { selectedStore },
  storeCategories: { storeCategories },
  users: { users },
}) => ({
  storeCategories,
  users,
  initialValues: selectedStore.id ? selectedStore : {},
});

const mapDispatchToProps = dispatch => ({
  getStoreCategories: () => {
    dispatch(requestCategories());
  },
  getUsers: () => {
    dispatch(requestUsers());
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
    form: 'storeForm',
  })(StoreFormPage)
);
