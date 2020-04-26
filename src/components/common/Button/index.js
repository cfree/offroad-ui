import React, { useCallback } from 'react';
import classnames from 'classnames';

import Styles from './button.module.scss';

const Button = ({
  onClick,
  children,
  ghost = false,
  className = '',
  href = '',
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
    [Styles['disabled']]: selected,
  });

  const btnComponent = href ? (
    <a disabled={disabled} href={href} className={classes} {...rest}>
      {children}
    </a>
  ) : (
    <button
      disabled={selected}
      onClick={handleClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );

  return <span className={Styles['wrapper']}>{btnComponent}</span>;
};

export default Button;
