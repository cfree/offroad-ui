export { states } from './states';

export const perPage = 4;
export const siteNameShort = '4-Players';
export const siteName = '4-Players of Colorado';

/**
 * Date/time
 *
 * Outdated:
 * M/d/yyyy    // 1/1/2001
 * M/d/yy      // 1/1/01
 */
export const dateFormat = 'dd LLL yyyy'; // 08 Sept 2018
export const dateFormatAbbrev = 'eee, MMM d'; // Sat, Jan 2
export const dateFormatFull = 'EEEE, MMMM d, yyyy'; // Thursday, April 1, 2021
export const dateFormatForm = 'yyyy-MM-dd'; // 2017-08-01
export const timeFormat = 'h:mm a'; // 3:00 PM
export const timeFormat24Hr = 'HH:mm'; // 03:00
export const dateTimeFormat = `${dateFormat}, ${timeFormat}`;
export const dateTimeFormatAbbrev = `${dateFormatAbbrev}, ${timeFormat}`;

/*
  Note: If someone is assigned a role, that does not change their title or office.
  Must be done manually.
*/
export const roles = {
  ADMIN: 'Admin',
  OFFICER: 'Officer',
  RUN_MASTER: 'Run Master',
  RUN_LEADER: 'Run Leader',
  USER: 'User',
};

export const accountStatuses = {
  // Paid-up full members
  ACTIVE: 'Active',
  // Full members who haven't paid dues between 1/1 and 3/31
  PAST_DUE: 'Past Due',
  // Full members who haven't paid dues between 4/1 and 12/31
  DELINQUENT: 'Delinquent',
  // Members who have been removed by the officers
  REMOVED: 'Removed',
  // Members who no longer want to be associated
  RESIGNED: 'Resigned',
  // Full members: Dues not received in a year
  INACTIVE: 'Inactive',
  // For accounts that were rejected
  REJECTED: 'Rejected',
  // For Guests who should join or leave
  LIMITED: 'Limited',
  // For new profiles
  LOCKED: 'Locked',
  DECEASED: 'Deceased',
};

export const accountTypes = {
  FULL: 'Full',
  ASSOCIATE: 'Associate',
  EMERITUS: 'Emeritus',
  GUEST: 'Guest',
};

export const offices = {
  // unique, can only be one user per office
  PRESIDENT: 'President',
  VICE_PRESIDENT: 'Vice President',
  SECRETARY: 'Secretary',
  TREASURER: 'Treasurer',
};

export const titles = {
  // can be multiple users with same title
  WEBMASTER: 'Webmaster',
  HISTORIAN: 'Historian',
  // RUN_LEADER: 'Run Leader',
  // RUN_MASTER: 'Run Master',
  CHARTER_MEMBER: 'Charter Member',
};

export const trailDifficulties = {
  UNKNOWN: 'Unknown',
  // BEGINNER: 'Easy', // deprecated
  EASY: 'Easy',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export const trailConditions = {
  UNKNOWN: 'Unknown',
  CLEAR: 'Clear',
  MINOR_ISSUES: 'Minor Issues',
  MAJOR_ISSUES: 'Major Issues',
  CLOSED: 'Closed',
};

export const migrationStatuses = {
  NEEDED: 'Not Done',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export const eventTypes = {
  RUN: 'Run',
  // COLLECTION: 'Collection of Events', // Moab, camping, etc.
  FUNDRAISING: 'Fundraising', // Beer bust, etc.
  MEETING: 'Meeting',
  CLINIC: 'Clinic',
  SOCIAL: 'Social',
  CAMPING: 'Camping',
};

export const rsvpStatuses = {
  NONE: 'None',
  CANT_GO: "Can't Go",
  GOING: 'Going',
  MAYBE: 'Maybe',
};

export const pastRsvpStatuses = {
  NONE: '',
  CANT_GO: "Didn't Go",
  GOING: 'Went',
  MAYBE: "Didn't Go",
};

export const outfitLevel = {
  MODIFIED: 'Modified',
  STOCK: 'Stock',
};

export const genders = {
  MALE: 'Male',
  FEMALE: 'Female',
  UNDISCLOSED: 'Undisclosed',
  OTHER: 'Other',
};

export const notificationsSettings = {
  emailPublicNotifications: 'Public Newsletter',
  emailMemberNotifications: 'Members Newsletter',
};

export const DEFAULT_AVATAR_SRC = '/img/default-user.jpg';
export const DEFAULT_AVATAR_SMALL_SRC = '/img/default-user.jpg';
export const DEFAULT_RIG_SRC = '/img/default-vehicle.jpg';
export const DEFAULT_EVENT_SRC = '/img/default-event.jpg';
export const DEFAULT_EVENT_SMALL_SRC = '/img/default-event-sm.jpg';
export const DEFAULT_TRAIL_SRC = 'https://placekitten.com/700/400';
export const DEFAULT_TRAIL_SMALL_SRC = 'https://placekitten.com/150/100';

export const membershipLogMessageTypes = [
  'ACCOUNT_CREATED',
  'ACCOUNT_UNLOCKED',
  'ACCOUNT_CHANGED',
  'ACCOUNT_REJECTED',
  'DUES_PAID',
  'OFFICE_ADDED',
  'OFFICE_REMOVED',
  'TITLE_ADDED',
  'TITLE_REMOVED',
  'MEMBERSHIP_ELIGIBLE', // Redundant?
  'MEMBERSHIP_GRANTED', // Redundant?
  'GUEST_RESTRICTED', // Redundant?
];

export const membershipLogMessages = {
  ACCOUNT_CREATED: () => 'Account created',
  ACCOUNT_UNLOCKED: ({ logger }) => `Account unlocked by ${logger}`,
  ACCOUNT_CHANGED: ({ property, beforeState, afterState, logger }) =>
    logger
      ? `${property} changed from "${beforeState}" to "${afterState}" by ${logger}`
      : `${property} automatically changed from "${beforeState}" to "${afterState}"`,
  ACCOUNT_REJECTED: ({ logger, reason }) =>
    `Account rejected by ${logger}: ${reason}`,
  DUES_PAID: (amt) => `Paid $${amt}`,
  OFFICE_ADDED: ({ office, logger }) => `"${office}" office added by ${logger}`,
  OFFICE_REMOVED: ({ office, logger }) =>
    `"${office}" office removed by ${logger}`,
  TITLE_ADDED: ({ title, logger }) => `"${title}" title added by ${logger}`,
  TITLE_REMOVED: ({ title, logger }) => `"${title}" title removed by ${logger}`,
  MEMBERSHIP_ELIGIBLE: () => 'Eligible for membership',
  MEMBERSHIP_GRANTED: ({ accountType }) =>
    `Became a ${accountTypes[accountType]} Member`,
  GUEST_RESTRICTED: () => 'Attended 3 runs',
};

// export const activityLogMessages = {
//   EVENT_ATTENDED: ({ title, type }) => `Attended "${title}" ${type}`,
//   RUN_LEAD: ({ title }) => `Led "${title}" run`,
//   EVENT_REVIEW_SUBMITTED: ({ title, type }) =>
//     `Wrote a review for "${title}" ${type}`,
//   RUN_REPORT_SUBMITTED: ({ title, type }) =>
//     `Wrote a Run Report for "${title}" ${type}`,
//   GALLERY_PHOTO_SUBMITTED: ({ title }) => `Added a photo to "${title}" gallery`,
//   GALLERY_PHOTOS_SUBMITTED: ({ title }) => `Added photos to "${title}" gallery`,
//   PROFILE_PHOTO_SUBMITTED: () => 'Added a new profile photo',
//   RIGBOOK_PHOTO_SUBMITTED: () => 'Added a new Rigbook photo',
//   // COMMENTED: '',
//   MEMBERSHIP_GRANTED: () => 'Became a Full Member',
// };

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weather = {
  CLEAR: 'Clear',
  PARTLY_CLOUDY: 'Partly Cloudy',
  CLOUDY: 'Cloudy',
  OVERCAST: 'Overcast',
  FOG: 'Fog',
  DRIZZLE: 'Drizzle',
  RAIN: 'Rain',
  STORMY: 'Thunderstorms',
  HAIL: 'Hail',
  TORNADO: 'Tornado',
  SLEET: 'Wintry Mix',
  SNOW: 'Snow',
};
