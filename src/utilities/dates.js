import { subYears, subDays } from 'date-fns';

export const dateEighteenYearsAgo = () => subYears(subDays(new Date(), 1), 18);

export const getDateAtTime = (time, date) => {
  const [hour, minute] = time.split(':');
  return date.setHours(hour, minute);
};
