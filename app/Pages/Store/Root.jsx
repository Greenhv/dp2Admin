import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import ContentWrapper from '../../components/Layout/ContentWrapper'
import ListPage from './pages/ListPage';
import StoreFormPage from './pages/StoreFormPage';

class Root extends PureComponent {
  state = {
    selectedStore: {},
  };

  selectStore = (store) => {
    this.setState({
      selectedStore: store,
    });
  };

  render() {
    const {
      match,
    } = this.props;
    const {
      selectedStore,
    } = this.state;

    return (
      <ContentWrapper>
        <h3>Storeos</h3>
        <Route
          exact
          path={match.url}
          render={props => <ListPage {...props} onSelectElement={this.selectStore} />}
        />
        <Route
          exact
          path={`${match.url}/nuevo`}
          component={StoreFormPage}
        />
        <Route
          exact
          path={`${match.url}/editar`}
          render={props => <StoreFormPage {...props} store={selectedProduct} />}
        />
      </ContentWrapper>
    );
  }
}

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
}

export default Root;
