import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import ContentWrapper from "Components/Layout/ContentWrapper";
import ErrorHandler from "Shared/ErrorHandler";
import ListPage from "./pages/ListPage";
import PromotionFormPage from "./pages/PromotionFormPage";
import promotions from "../../Modules/promotions";

const Root = ({ match, location }) => (
  <ContentWrapper>
    <h3 className="header-container">
      <span>Promociones</span>
      <div>
        { match.url === location.pathname && (
          <Link to="/promociones/nuevo">
            <Button>Nueva Promocion</Button>
          </Link>
        )}
      </div>
    </h3>
    <Route
      exact
      path="/promociones"
      component={ListPage}
    />
    <Route
      exact
      path="/promociones/nuevo"
      component={PromotionFormPage}
    />
    <Route
      exact
      path="/promociones/editar/:id"
      component={PromotionFormPage}
    />
  </ContentWrapper>
);

Root.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
}

export default Root