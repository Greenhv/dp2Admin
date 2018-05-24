import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorHandler extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  state = {
    hasError: false,
    error: '',
    errorInfo: '',
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      errorInfo: info,
    });

    // console.log(error, info);
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      const {
        error,
        errorInfo,
      } = this.state;

      return (
        <div>
          <h2>Something went wrong</h2>
          <details>
            { error.toString() }
            <br/>
            { errorInfo.componentStack }
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
