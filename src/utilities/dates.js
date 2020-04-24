import { subYears, subDays } from 'date-fns';

export const dateEighteenYearsAgo = subYears(subDays(new Date(), 1), 18);
