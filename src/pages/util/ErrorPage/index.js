import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../../components/common/Button';

import Styles from './errorPage.module.scss';

const ErrorPage = () => {
  const history = useHistory();

  return (
    <div className={Styles['error']}>
      <div className={Styles['error-msg']}>
        <h2>Oops...</h2>
        <p>That page can't be found. Try again?</p>
        <Button onClick={() => history.goBack()}>Back</Button>
        <Button onClick={() => history.push('/')}>Home</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
