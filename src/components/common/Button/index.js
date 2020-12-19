import React, { useCallback } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Styles from './button.module.scss';

const Button = ({
  onClick,
  children,
  ghost = false,
  className = '',
  href = '',
  to = '',
  selected = false,
  disabled = false,
  ...rest
}) => {
  const handleClick = useCallback(
    (e) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    },
    [disabled, onClick],
  );
  const classes = classnames(className, {
    [Styles['button']]: !ghost,
    [Styles['button--ghost']]: ghost,
    [Styles['selected']]: selected,
    [Styles['disabled']]: disabled || selected,
  });

  let btnComponent;

  if (href) {
    btnComponent = (
      <a disabled={disabled} href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  } else if (to) {
    btnComponent = (
      <Link disabled={disabled} to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  } else {
    btnComponent = (
      <button
        disabled={disabled || selected}
        onClick={handleClick}
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return <span className={Styles['wrapper']}>{btnComponent}</span>;
};

export default Button;
