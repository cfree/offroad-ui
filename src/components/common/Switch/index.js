import React, { useState, useCallback } from 'react';
import { Switch as RebassSwitch } from '@rebass/forms';

import Icon from '../../common/Icon';

import Styles from './switch.module.scss';

const Switch = ({ offLabel, onLabel, onClick, onToStart = false }) => {
  const [isChecked, setIsChecked] = useState(onToStart);
  const handleClick = useCallback(() => {
    setIsChecked(!isChecked);
    onClick(!isChecked);
  }, [onClick, isChecked]);

  return (
    <div className={Styles['switch']}>
      <Icon icon="off">{offLabel}</Icon>
      <span onClick={handleClick}>
        <RebassSwitch checked={isChecked} />
      </span>
      <Icon icon="on">{onLabel}</Icon>
    </div>
  );
};

export default Switch;
