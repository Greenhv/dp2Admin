import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  deleteStoreCategories,
  fetchStoreCategories,
  selectStoreCategories,
  getStoreCategories as requestStoreCategories,
} from 'Modules/storeCategories';
import DataTables from 'Shared/DataTable.jsx';
import Loader from 'Shared/Loader.jsx';
import 'Components/Common/notify';
import { storeCategoryType } from '../types';

class DataTableWithStoreCategories extends PureComponent {
  componentDidMount() {
    const {
      getStoreCategories,
    } = this.props;

    getStoreCategories();
  }

  render() {
    const {
      storeCategories,
      isLoadingStoreCategories,
      storeCategoriesError,
      selectStoreCategories,
      deleteStoreCategories,
    } = this.props;

    if (storeCategoriesError) {
      $.notify(storeCategoriesError, 'danger');
    }

    return (
      <div>
        { isLoadingStoreCategories ? (
          <Loader />
        ) : (
          <DataTables
            headers={[{ key: 'name', title: 'Nombre' }, { key: 'description', title: 'Descripcion' }]}
            elements={storeCategories}
            onView={selectStoreCategories}
            onEdit={selectStoreCategories}
            onDelete={deleteStoreCategories}
          />
        ) }
      </div>
    );
  }
}

DataTableWithStoreCategories.propTypes = {
  storeCategories: PropTypes.arrayOf(storeCategoryType).isRequired,
  isLoadingStoreCategories: PropTypes.bool.isRequired,
  storeCategoriesError: PropTypes.string.isRequired,
  selectStoreCategories: PropTypes.func.isRequired,
  deleteStoreCategories: PropTypes.func.isRequired,
  getStoreCategories: PropTypes.func.isRequired,
}

const mapStateToProps = ({ storeCategories: { storeCategories, isLoading, error } }) => ({
  storeCategories,
  isLoadingStoreCategories: isLoading,
  storeCategoriesError: error,
});

const mapDispatchToProps = dispatch => ({
  getStoreCategories: () => {
    dispatch(fetchStoreCategories())
    dispatch(requestStoreCategories());
  },
  selectStoreCategories: category => () => {
    dispatch(selectStoreCategories(category));
  },
  deleteStoreCategories: category => () => {
    dispatch(deleteStoreCategories(category));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTableWithStoreCategories);
