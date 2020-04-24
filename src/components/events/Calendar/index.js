import React from 'react';
import { format } from 'date-fns';

import '.';

const Calendar = ({ date }) => {
  return (
    <div className="calendar" title={format(date, 'mm-dd-yyyy')}>
      <div className="date">{format(date, 'D')}</div>
      <div className="month">{format(date, 'mmm')}</div>
    </div>
  );
};

export default Calendar;
