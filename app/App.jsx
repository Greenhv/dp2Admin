import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';

import initTranslation from './components/Common/localize';
import initLoadThemes from './components/Common/load-themes';

import Routes from './Routes';

// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'

// Init translation system
initTranslation();
// // Init css loader (for themes)
// initLoadThemes();

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.async = true;
});

const store = createStore();

ReactDOM.render((
    // specify basename below if running
    // in a subdirectory or set as "/" if app runs in root
    <Provider store={store}>
        <BrowserRouter basename={process.env.WP_BASE_HREF}>
            <Routes />
        </BrowserRouter>
    </Provider>
), document.getElementById('app'))
