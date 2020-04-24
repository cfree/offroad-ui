import React, { useCallback } from 'react';
import classnames from 'classnames';

import './button.module.scss';

const Button = ({
  onClick,
  children,
  ghost = false,
  className = '',
  href = '',
  selected = false,
  disabled = false,
}) => {
  const handleClick = useCallback(
    (e) => {
      if (!disabled) {
        onClick(e);
      }
    },
    [disabled, onClick],
  );
  const classes = classnames(className, {
    button: !ghost,
    'button--ghost': ghost,
    selected: selected,
    disabled: selected,
  });

  const btnComponent = href ? (
    <a disabled={disabled} href={href} className={classes}>
      {children}
    </a>
  ) : (
    <button disabled={selected} onClick={handleClick} className={classes}>
      {children}
    </button>
  );

  return <span className="wrapper">{btnComponent}</span>;
};

export default Button;
