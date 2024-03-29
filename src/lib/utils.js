import { accountTypes as types } from './constants';

export const sortByDateAsc = (key) => {
  return (a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };
};

export const sortByDateDesc = (key) => {
  return (a, b) => {
    if (a[key] < b[key]) {
      return 1;
    }
    if (a[key] > b[key]) {
      return -1;
    }
    return 0;
  };
};

export const getMemberType = (type) => {
  return `${types[type] || 'Guest'} Member`;
};

export const getPhoneNumber = (phoneNo) => {
  const phoneString = phoneNo.toString();

  return phoneString.length === 10
    ? `(${phoneString.substring(0, 3)}) ${phoneString.substring(
        3,
        6,
      )}-${phoneString.substring(6)}`
    : '';
};

export const formatFilterSelect = (obj) => {
  return Object.entries(obj).map((entry) => ({
    value: entry[0],
    label: entry[1],
  }));
};

export const formatFilterSelected = (values = [], valuesMap) => {
  const result = values
    .filter((value) => valuesMap[value])
    .map((value) => ({
      value,
      label: valuesMap[value],
    }));

  return result;
};

export const emailGroups = [
  { value: 'officers', label: 'Officers' },
  { value: 'runmaster', label: 'Run Master' },
  { value: 'webmaster', label: 'Webmaster' },
  { value: 'run_leaders', label: 'Run Leaders' },
  { value: 'full_membership', label: 'Active Full Members' },
  { value: 'all_active', label: 'Active Users' },
  { value: 'guests', label: 'Active Guests' },
  { value: 'all_users', label: 'ALL USERS' },
];

// Roles
export const isAdmin = (role) => role === 'ADMIN';

export const isBoardMember = (role) => role === 'OFFICER';

export const isAtLeastBoardMember = (role) => {
  return ['OFFICER', 'ADMIN'].includes(role);
};

export const isRunMaster = (role) => role === 'RUN_MASTER';

export const isRunLeader = (role) => role === 'RUN_LEADER';

export const isAtLeastRunMaster = (role) => {
  return ['RUN_MASTER', 'OFFICER', 'ADMIN'].includes(role);
};

export const isAtMostRunmaster = (role) => {
  return ['RUN_MASTER', 'RUN_LEADER', 'USER'].includes(role);
};

export const isAtLeastRunLeader = (role) => {
  return ['RUN_LEADER', 'RUN_MASTER', 'OFFICER', 'ADMIN'].includes(role);
};

// Types
export const isFullMember = (type) => type === 'FULL';
export const isNotFullMember = (type) => type !== 'FULL';

export const isMember = (type) =>
  ['ASSOCIATE', 'EMERITUS', 'FULL'].includes(type);

export const isAssociateMember = (type) => type === 'ASSOCIATE';

export const isAtLeastAssociateMember = (type) => {
  return ['ASSOCIATE', 'FULL'].includes(type);
};

export const isEmeritusMember = (type) => type === 'EMERITUS';

export const isAtLeastEmeritusMember = (type) => {
  return ['EMERITUS', 'ASSOCIATE', 'FULL'].includes(type);
};

export const isGuestMember = (type) => type === 'GUEST';

export const isAtLeastGuestMember = (type) => {
  return ['GUEST', 'EMERITUS', 'ASSOCIATE', 'FULL'].includes(type);
};

export const formatPhone = (phoneNum) => {
  const phone = phoneNum.toString();
  const areaCode = phone.substring(0, 3);
  const prefix = phone.substring(3, 6);
  const line = phone.substring(6);

  return `${areaCode}-${prefix}-${line}`;
};

// Statuses
export const isActive = (status) => status === 'ACTIVE';
export const isNotActive = (status) => !isActive(status);

export const isPastDue = (status) => status === 'PAST_DUE';
export const isNotPastDue = (status) => !isPastDue(status);

export const isActiveOrPastDue = (status) =>
  status === 'ACTIVE' || status === 'PAST_DUE';

export const isDelinquent = (status) => status === 'DELINQUENT';
export const isNotDelinquent = (status) => !isDelinquent(status);

export const wasRemoved = (status) => status === 'REMOVED';
export const wasNotRemoved = (status) => !wasRemoved(status);

export const hasResigned = (status) => status === 'RESIGNED';
export const hasNotResigned = (status) => !hasResigned(status);

export const isInactive = (status) => status === 'INACTIVE';
export const isNotInactive = (status) => !isInactive(status);

export const isLimited = (status) => status === 'LIMITED';
export const isNotLimited = (status) => !isLimited(status);

export const isLocked = (status) => status === 'LOCKED';
export const isNotLocked = (status) => !isLocked(status);

export const isRejected = (status) => status === 'REJECTED';
export const isNotRejected = (status) => !isRejected(status);

export const isDeceasedMember = (status) => status === 'DECEASED';
export const isNotDeceasedMember = (status) => !isDeceasedMember(status);

// Cloudinary upload presets
export const getUploadLocation = (appendage) => {
  const env = process.env.STAGING_ENV || process.env.NODE_ENV;

  switch (env) {
    case 'development':
      return `dev_${appendage}`;
    case 'staging':
      return `staging_${appendage}`;
    case 'production':
    default:
      return `prod_${appendage}`;
  }
};

export const uploadImage = async (file, location) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', getUploadLocation(location));

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/fourplayers/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const jsonResults = await res.json();

    if (jsonResults) {
      return {
        publicId: jsonResults.public_id,
        url: jsonResults.secure_url,
        smallUrl: jsonResults.eager[0].secure_url,
      };
    }
  } catch (e) {
    return null;
  }
};

export const convertQueryParams = (params) => {
  if (params.indexOf('?') !== 0 && params.indexOf('=') === -1) {
    return {};
  }

  return params
    .replace('?', '')
    .split('&')
    .reduce((acc, pair) => {
      const newPair = pair.split('=');
      return {
        ...acc,
        [newPair[0]]: newPair[1],
      };
    }, {});
};

export const getUserRSVPStatus = (attendees, eventId, userId) => {
  if (attendees) {
    const attendee = attendees.find((rsvp) => rsvp.member.id === userId);

    return (attendee && attendee.status) || 'NONE';
  }
  return 'NONE';
};

export const getFullMemberDuesAmount = () => {
  return parseInt(process.env.REACT_APP_FULL_MEMBERSHIP_DUES, 10);
};

export const getAssociateMemberDuesAmount = () => {
  return parseInt(process.env.REACT_APP_ASSOCIATE_MEMBERSHIP_DUES, 10);
};

export const getDuesAmount = (
  fullMemberCount = 1,
  associateMemberCount = 0,
  includeFees = false,
) => {
  // Current: Stripe
  // 2.9% + $0.30 per transaction
  const fullMemberDues =
    parseInt(process.env.REACT_APP_FULL_MEMBERSHIP_DUES, 10) * fullMemberCount;

  const associateMemberDues =
    parseInt(process.env.REACT_APP_ASSOCIATE_MEMBERSHIP_DUES, 10) *
    associateMemberCount;

  const dues = fullMemberDues + associateMemberDues;

  return includeFees ? ((dues + 0.3) / (1 - 0.029)).toFixed(2) : dues;
};

export const convertToCents = (dollarAmt) => {
  return dollarAmt * 100;
};

export const whatYearIsIt = () => {
  return new Date().getFullYear();
};

export const getBadgeType = (difficulty) => {
  switch (difficulty) {
    case 'EASY':
      return 'success';
    case 'INTERMEDIATE':
      return 'caution';
    case 'ADVANCED':
      return 'fail';
    case 'UNKNOWN':
    default:
      return 'neutral';
  }
};

export const onMapImgError = (e) => {
  e.target.src = '/img/default-map.png';
};

export const getMaxRigs = (count) => count > -1 && `Max ${count} rigs`;

export const getMaxAttendees = (count) =>
  count > -1 && `Max ${count} attendees`;
