import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  deleteStores,
  fetchStores,
  selectStores,
  getStores as requestStores,
} from 'Modules/stores';
import DataTables from 'Shared/DataTable.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { storeType } from '../types';

class DataTableWithStores extends PureComponent {
  componentDidMount() {
    const {
      getStores,
    } = this.props;

    getStores();
  }

  render() {
    const {
      productCategories,
      isLoadingCategories,
      categoriesError,
      selectStores,
      deleteStores,
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
            onView={selectStores}
            onEdit={selectStores}
            onDelete={deleteStores}
          />
        ) }
      </div>
    );
  }
}

DataTableWithStores.propTypes = {
  stores: PropTypes.arrayOf(storeType).isRequired,
  isLoadingStores: PropTypes.bool.isRequired,
  storesError: PropTypes.string.isRequired,
  selectStores: PropTypes.func.isRequired,
  deleteStores: PropTypes.func.isRequired,
  getStores: PropTypes.func.isRequired,
}

const mapStateToProps = ({ stores: { stores, isLoading, error } }) => ({
  stores,
  isLoadingStores: isLoading,
  storesError: error,
});

const mapDispatchToProps = dispatch => ({
  getStores: () => {
    dispatch(fetchStores())
    dispatch(requestStores());
  },
  selectStores: category => () => {
    dispatch(selectStores(category));
  },
  deleteStores: category => () => {
    dispatch(deleteStores(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTableWithStores);
