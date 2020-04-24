import React from 'react';

import Styles from './icon.module.scss';

const Icon = ({ icon, children }) => {
  return (
    <i className={Styles['icon']}>
      <span className={Styles[`icon-${icon}`]}>{children}</span>
    </i>
  );
};

export default Icon;
