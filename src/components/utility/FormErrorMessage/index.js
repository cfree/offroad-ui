import React from 'react';

import Styles from './formErrorMessage.module.scss';

const FormErrorMessage = ({ children }) => (
  <div className={Styles['error-message']}>{children}</div>
);
export default FormErrorMessage;
