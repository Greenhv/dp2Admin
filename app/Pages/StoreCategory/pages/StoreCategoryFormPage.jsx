import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { shape, func } from "prop-types";
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
import { connect } from 'react-redux';
import { reduxForm, Field } from "redux-form";

import Select from "Shared/Select";
import CustomInput from "Shared/Form/CustomInput";
import {
  createStoreCategory as createStoreCategoryAction,
  clearSelected,
  updateStoreCategory as updateStoreCategoryAction,
} from "Modules/storeCategories";

class StoreCategoryFormPage extends PureComponent {
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

  goToStoreCategoriesPage = () => {
    const { history } = this.props;
    history.push("/categoria-de-tiendas");;
  };

  createStoreCategory = (values, dispatch) => {
    const { history } = this.props;

    swal({
      title: 'Se esta creando su categoria de tienda',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(createStoreCategoryAction(history, values));
  }

  updateStoreCategory = (values, dispatch, id) => {
    const { history } = this.props;

    swal({
      title: 'Se esta actualiazando su categoria de tienda',
      text: 'Espere por favor',
      onOpen: () => {
          swal.showLoading()
      }
    });
    dispatch(updateStoreCategoryAction(history, values, id));
  }

  onStoreCategorySubmit = (values, dispatch) => {
    const {
      history,
    } = this.props;

    if ($(this.form).parsley().isValid()) {
    }
  };

  render() {
    const { history, handleSubmit } = this.props;
    return(
      <Grid fluid>
      <Row>
        <Col lg={12}>
        <Panel>
          <form onSubmit ={handleSubmit(this.onStoreCategorySubmit)} noValidate ref={(node) => {this.form = node}}>
          <Panel.Body>
            <FormGroup>
              <ControlLabel>Nombre de la categoría</ControlLabel>
              <Field
                name="name"
                component={CustomInput}
                type="text"
                props = {{ placeholder: 'Nombre de la categoría', required: 'required'}}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Descripción de la categoría</ControlLabel>
              <Field
                name="description"
                component={CustomInput}
                componentClass="textarea"
                type="text"
                props={{ placeholder: 'Ingrese la descripción de su categoría', required: 'required' }}
              />
            </FormGroup>
          </Panel.Body>
          <Panel.Footer>
            <div className="form-footer">
            <div className="form-button">
            <Button onClick={this.goToStoreCategoriesPage}>Cancelar</Button>
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
    )
  }
}

StoreCategoryFormPage.propTypes = {
  history: shape({}).isRequired,
  removeSelected: func.isRequired,
}

const mapStateToProps = ({ storeCategories: { selectedCategory } }) => ({
  initialValues: selectedCategory.id ? selectedCategory : {},
});

const mapDispatchToProps = dispatch => ({
  removeSelected: () => {
    dispatch(clearSelected());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'storeCategoryForm',
  })(StoreCategoryFormPage)
);
