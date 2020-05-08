import { format, subYears, subDays } from 'date-fns';

export const dateEighteenYearsAgo = format(
  subYears(subDays(new Date(), 1), 18),
  'yyyy-MM-dd',
);

export const getDateAtTime = (time, date) => {
  const [hour, minute] = time.split(':');
  return date.setHours(hour, minute);
};
