import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/common/Button';

import Styles from './errorBoundary.module.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { history } = this.props;

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={Styles['error']}>
          <div className={Styles['error-msg']}>
            <h2>Uh Oh...</h2>
            <p>Something went wrong. Try again?</p>
            <Button onClick={() => history.goBack()}>Back</Button>
            <Button onClick={() => history.push('/')}>Home</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
