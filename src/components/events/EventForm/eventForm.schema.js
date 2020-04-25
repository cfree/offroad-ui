import * as yup from 'yup';
import startOfToday from 'date-fns/startOfToday';

export const eventSchema = yup.object().shape({
  type: yup.string().required('Event type is required'),
  title: yup.string().required('Title is required'),
  description: yup.string(),
  startDate: yup.date().min(startOfToday()).required('Start date is required'),
  startTime: yup.string().required('Start time is required'),
  endDate: yup.date().min(startOfToday()).required('End date is required'),
  endTime: yup.string().required('End time is required'),
  address: yup.string().nullable(),
  trailDifficulty: yup.string().nullable(),
  // trailNotes: yup.string(),
  rallyAddress: yup.string().nullable(),
  rallyTime: yup.string().nullable().default(null),
  membersOnly: yup.boolean(),
  host: yup.string(), // ID
  trail: yup.string().nullable(), // ID
});
