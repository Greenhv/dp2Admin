import React from 'react';
import { BrowserRouter, withRouter, Switch, Route, Redirect, Miss } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { hot } from 'react-hot-loader';

import Base from 'Components/Layout/Base';
import BasePage from 'Components/Layout/BasePage';
import BaseHorizontal from 'Components/Layout/BaseHorizontal';
import DashboardV1 from 'Components/Dashboard/DashboardV1';
import FormStandard from 'Components/Forms/FormStandard';
import FormValidation from 'Components/Forms/FormValidation';
import Login from 'Components/Pages/Login';
import Register from 'Components/Pages/Register';
import Recover from 'Components/Pages/Recover';
import Lock from 'Components/Pages/Lock';
import NotFound from 'Components/Pages/NotFound';
import Error500 from 'Components/Pages/Error500';
import Maintenance from 'Components/Pages/Maintenance';

import pages from './Pages';
import { getNumber } from './Utils/randomizer';

// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/login',
    '/register',
    '/recover',
    '/lock',
    '/notfound',
    '/error500',
    '/maintenance'
];

const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInUp'
    //      'rag-fadeInDown'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'
    //      'rag-fadeInUpBig'
    //      'rag-fadeInDownBig'
    //      'rag-fadeInRightBig'
    //      'rag-fadeInLeftBig'
    //      'rag-zoomBackDown'
    const animationName = 'rag-fadeIn'

    if(listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Switch location={location}>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/recover" component={Recover}/>
                    <Route path="/lock" component={Lock}/>
                    <Route path="/notfound" component={NotFound}/>
                    <Route path="/error500" component={Error500}/>
                    <Route path="/maintenance" component={Maintenance}/>
                </Switch>
            </BasePage>
        )
    }
    else {
        return (
            <Base>
              <TransitionGroup>
                <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                    <div>
                        <Switch location={location}>
                            {/*Dashboard*/}
                            {/* <Route path="/dashboard" component={DashboardV1}/> */}
                            {/* <Route path="/form-standard" component={FormStandard}/>
                            <Route path="/form-validation" component={FormValidation}/> */}
                            { pages.map(page => (
                                <Route
                                    key={getNumber()}
                                    path={page.path}
                                    component={page.component}
                                />
                            )) }
                            <Redirect to="/dashboard" />
                        </Switch>
                    </div>
                </CSSTransition>
              </TransitionGroup>
            </Base>
        )
    }
}

export default hot(module)(withRouter(Routes));