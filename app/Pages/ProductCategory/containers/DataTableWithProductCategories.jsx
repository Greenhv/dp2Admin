import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import {
  deleteProductCategories,
  fetchProductCategories,
  selectProductCategories,
  getProductCategories as requestCategories,
} from 'Modules/productCategories';
import { getNumber } from 'Utils/randomizer';
import DataTables from 'Shared/DataTable.jsx';
import Loader from 'Shared/Loader.jsx';
import DataTableEmptyMsg from 'Shared/DataTableEmptyMsg.jsx';
import 'Components/Common/notify';
import { productCategoryType } from '../types';

class DataTableWithProductCategories extends PureComponent {
  componentDidMount() {
    const {
      getProductCategories,
      productCategories,
    } = this.props;

    if (productCategories < 1) {
      getProductCategories();
    }
  }

  renderProductCategories = () => {
    const {
      productCategories,
      selectProductCategories,
      deleteProductCategories,
    } = this.props;

    return productCategories.map(productCategory => (
      <tr key={getNumber()}>
        <td>{ productCategory.name }</td>
        <td>{ productCategory.description }</td>
        <td>
          <Button onClick={selectProductCategories && selectProductCategories(productCategory.id)}>
            <em className="fa fa-eye"></em>
          </Button>
          <Button onClick={selectProductCategories && selectProductCategories(productCategory.id)}>
            <em className="fa fa-pencil"></em>
          </Button>
          <Button onClick={deleteProductCategories && deleteProductCategories(productCategory.id)}>
            <em className="fa fa-remove"></em>
          </Button>
        </td>
      </tr>
    ));
  }

  render() {
    const {
      productCategories,
      isLoadingCategories,
      categoriesError,
    } = this.props;

    if (categoriesError) {
      $.notify(categoriesError, 'danger');
    }

    return (
      <div>
        { isLoadingCategories ? (
          <Loader />
        ) : (
          <DataTables
            headers={[
              { key: 'name', title: 'Nombre' },
              { key: 'description', title: 'Descripcion' },
            ]}
          >
            { productCategories.length > 0 ? this.renderProductCategories() : (
              <DataTableEmptyMsg colSpan={3}>No hay productos para mostrar</DataTableEmptyMsg>
            ) }
          </DataTables>
        ) }
      </div>
    );
  }
}

DataTableWithProductCategories.propTypes = {
  productCategories: PropTypes.arrayOf(productCategoryType).isRequired,
  isLoadingCategories: PropTypes.bool.isRequired,
  categoriesError: PropTypes.string.isRequired,
  selectProductCategories: PropTypes.func.isRequired,
  deleteProductCategories: PropTypes.func.isRequired,
  getProductCategories: PropTypes.func.isRequired,
}

const mapStateToProps = ({ productCategories: { productCategories, isLoading, error } }) => ({
  productCategories,
  isLoadingCategories: isLoading,
  categoriesError: error,
});

const mapDispatchToProps = dispatch => ({
  getProductCategories: () => {
    dispatch(fetchProductCategories())
    dispatch(requestCategories());
  },
  selectProductCategories: category => () => {
    dispatch(selectProductCategories(category));
  },
  deleteProductCategories: category => () => {
    dispatch(deleteProductCategories(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTableWithProductCategories);
