import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  deleteProductCategories,
  fetchProductCategories,
  selectProductCategories,
  getProductCategories as requestCategories,
} from 'Modules/productCategories';
import DataTables from 'Shared/DataTable.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { productCategoryType } from '../types';

class DataTableWithProductCategories extends PureComponent {
  componentDidMount() {
    const {
      getProductCategories,
    } = this.props;

    getProductCategories();
  }

  render() {
    const {
      productCategories,
      isLoadingCategories,
      categoriesError,
      selectProductCategories,
      deleteProductCategories,
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
            headers={[{ key: 'name', title: 'Nombre' }, { key: 'description', title: 'Descripcion' }]}
            elements={productCategories}
            onView={selectProductCategories}
            onEdit={selectProductCategories}
            onDelete={deleteProductCategories}
          />
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
