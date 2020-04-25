import React from 'react';
import format from 'date-fns/format';

import Styles from './calendar.module.scss';

const Calendar = ({ date }) => {
  const dateValue = new Date(date);

  return (
    <div className={Styles['calendar']} title={format(dateValue, 'MM-dd-yyyy')}>
      <div className={Styles['date']}>{format(dateValue, 'd')}</div>
      <div className={Styles['month']}>{format(dateValue, 'MMM')}</div>
    </div>
  );
};

export default Calendar;
