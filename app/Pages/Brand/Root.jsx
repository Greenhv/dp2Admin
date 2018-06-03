import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ContentWrapper from 'Components/Layout/ContentWrapper;
import ErrorHandler from 'Shared/ErrorHandler';

const Root = ({ match, location }) => (
    <ContentWrapper>
        <h3 className="header-container">
        <span>Marca</span>
        <div>
            { math.url === location.pathname && (
                <Link to="/marcas/nuevo">
                <Button>Nueva Marca</Button>
                </Link>
            )}
        </div>
        </h3>
        <Route
        exact
        path="/marcas/nuevo"
        component={}
        />
    </ContentWrapper>
);