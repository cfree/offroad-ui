import React from 'react';
import DatePicker from '../../utility/DatePicker';
import DateTimePicker from 'react-datetime-picker';

export const DatePickerField = ({ name, value, onChange, ...props }) => {
  return (
    <DatePicker
      value={value || null}
      onChange={(val) => {
        onChange(name, val);
      }}
      {...props}
    />
  );
};

export const DateTimePickerField = ({ name, value, onChange, ...props }) => {
  return (
    <DateTimePicker
      value={value || null}
      onChange={(val) => {
        onChange(name, val);
      }}
      {...props}
    />
  );
};

export const TimeRangePickerField = () => {
  return <div></div>;
};
