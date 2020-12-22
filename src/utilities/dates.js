import { format, subYears, subDays } from 'date-fns';

import { dateFormat } from '../lib/constants';

export const dateEighteenYearsAgo = format(
  subYears(subDays(new Date(), 1), 18),
  dateFormat,
);

export const getDateAtTime = (time, date) => {
  const [hour, minute] = time.split(':');
  return date.setHours(hour, minute);
};
