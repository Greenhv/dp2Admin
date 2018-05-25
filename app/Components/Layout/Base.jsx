import React from 'react';

import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import ErrorHandler from 'Shared/ErrorHandler';

class Base extends React.Component {

    render() {

        return (
            <div className="wrapper">
                <ErrorHandler>
                    <Header />
                </ErrorHandler>

                <ErrorHandler>
                    <Sidebar />
                </ErrorHandler>

                <section>
                    { this.props.children }
                </section>

                <ErrorHandler>
                    <Footer />
                </ErrorHandler>
            </div>
        );
    }

}

export default Base;
