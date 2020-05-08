import React from 'react';
import cn from 'classnames';

import Styles from './icon.module.scss';

const Icon = ({ icon, className, children, ...props }) => {
  const classNames = cn(Styles['icon'], Styles[`icon-${icon}`], className);

  return (
    <i className={classNames} title={children} aria-label={children} {...props}>
      {children}
    </i>
  );
};

export default Icon;
