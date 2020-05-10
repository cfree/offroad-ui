import React from 'react';
import cn from 'classnames';

import Styles from './badge.module.scss';

const Badge = ({ type, className, children, ...rest }) => {
  const classes = cn(
    Styles['badge'],
    {
      [Styles['badge--success']]: type === 'success',
      [Styles['badge--caution']]: type === 'caution',
      [Styles['badge--warning']]: type === 'warning',
      [Styles['badge--fail']]: type === 'fail',
      [Styles['badge--neutral']]: type === 'neutral',
    },
    className,
  );

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
