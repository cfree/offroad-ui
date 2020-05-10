import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../common/Button';

import Styles from './unauthorized.module.scss';

const Unauthorized = () => {
  const history = useHistory();

  return (
    <div className={Styles['unauthorized']}>
      <div className={Styles['unauthorized-msg']}>
        <h2>Not today...</h2>
        <p>You're not authorized to visit this page.</p>
        <Button onClick={() => history.goBack()}>Back</Button>
        <Button onClick={() => history.push('/')}>Home</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
