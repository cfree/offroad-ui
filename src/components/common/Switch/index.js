import React, { useState, useCallback } from 'react';
import { Switch as RebassSwitch } from '@rebass/forms';

import Icon from '../../common/Icon';

import Styles from './switch.module.scss';

const Switch = ({
  offLabel,
  offIcon,
  onLabel,
  onIcon,
  onClick,
  onToStart = false,
}) => {
  const [isChecked, setIsChecked] = useState(onToStart);
  const handleClick = useCallback(() => {
    setIsChecked(!isChecked);
    onClick(!isChecked);
  }, [onClick, isChecked]);

  return (
    <div className={Styles['switch']}>
      {offIcon ? (
        <Icon icon={offIcon} className={Styles['icon--off']}>
          {offLabel}
        </Icon>
      ) : (
        offLabel
      )}
      <span onClick={handleClick}>
        <RebassSwitch checked={isChecked} />
      </span>
      {onIcon ? (
        <Icon icon={onIcon} className={Styles['icon--on']}>
          {onLabel}
        </Icon>
      ) : (
        onLabel
      )}
    </div>
  );
};

export default Switch;
