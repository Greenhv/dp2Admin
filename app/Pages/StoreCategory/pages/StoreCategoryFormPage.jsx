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
import { reduxForm, Field } from "redux-form";

import Select from "Shared/Select";
import CustomInput from "Shared/Form/CustomInput";
import { addStoreCategory } from "Modules/storeCategories";

let StoreCategoryForm = props => {
  const { handleSubmit } = props;
  return;
  <form onSubmit={handleSubmit} />;
};

const onStoreCategorySubmit = (values, dispatch) => {
  if (Object.keys(values).length >= 2) {
    fetch(`${process.env.API_BASE_URL}produts`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(addStoreCategory(data.storeCategory));
        window.history.back();
      });
  }
};

class StoreCategoryFormPage extends PureComponent {
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.form);
    $(element).parsley();
  }

  goToStoreCategoriesPage = () => {
    const { history } = this.props;
    history.push("/categoria-de-tiendas");
  };

  render() {
    const { history, handleSubmit } = this.props;
    return(
      <Grid fluid>
      <Row>
        <Col lg={12}>
        <Panel>
          <form onSubmit ={handleSubmit} noValidate ref={(node) => {this.form = node}}>
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
              name="decription"
              component={CustomInput}
              type="textarea"
              props={{ placeholder: 'Descripción del la categoría', required: 'required'}}
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

StoreCategoryFormPage .propTypes = {
  history: shape({}).isRequired,
}
export default reduxForm({
  form: 'productForm',
  onSubmit: onStoreCategorySubmit,
})(StoreCategoryFormPage)


