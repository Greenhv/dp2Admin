import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import ContentWrapper from '../../components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';
import StoreCategoryFormPage from './pages/StoreCategoryFormPage';

class Root extends PureComponent {
  state = {
    selectedStoreCategory: {},
  };

  selectStoreCategory = (category) => {
    this.setState({
      selectedStoreCategory: category,
    });
  };

  render() {
    const {
      match,
    } = this.props;
    const {
      selectedStoreCategory,
    } = this.state;

    return (
      <ContentWrapper>
        <h3>Storeos</h3>
        <Route
          exact
          path={match.url}
          render={props => <ListPage {...props} onSelectElement={this.selectStoreCategory} />}
        />
        <Route
          exact
          path={`${match.url}/nuevo`}
          component={StoreCategoryFormPage}
        />
        <Route
          exact
          path={`${match.url}/editar`}
          render={props => <StoreCategoryFormPage {...props} category={selectedStoreCategory} />}
        />
      </ContentWrapper>
    );
  }
}

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

export default Root;
