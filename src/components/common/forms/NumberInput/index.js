import React, { useState, useCallback } from 'react';

const NumberInput = ({
  defaultValue = 0,
  onChange = () => {},
  width = 60,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = useCallback(
    (e) => {
      const { value } = e.target;
      setValue(value);
      onChange(value);
    },
    [onChange, setValue],
  );

  const style = { width };

  return (
    <input
      value={value}
      onChange={handleValueChange}
      type="number"
      style={style}
      {...props}
    />
  );
};

export default NumberInput;
