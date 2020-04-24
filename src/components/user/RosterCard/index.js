import React from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import {
  getMemberType,
  getPhoneNumber,
  isAtLeastBoardMember,
} from '../../../lib/utils';
import { DEFAULT_AVATAR_SMALL_SRC } from '../../../lib/constants';
import Filter from '../../login/Filter';

import Styles from './rosterCard.module.scss';

const RosterCard = ({ user }) => {
  const phone = get(user, 'contactInfo.phone', '');

  return (
    <div className={Styles['roster-card']}>
      <img
        className="member__img"
        src={(user.avatar && user.avatar.smallUrl) || DEFAULT_AVATAR_SMALL_SRC}
        alt={user.firstName}
      />
      <span>
        {user.firstName} {user.lastName}
      </span>
      <span>{getMemberType(user.accountType)}</span>
      {phone && <span>{getPhoneNumber(phone)}</span>}
      <span className="member__actions">
        <Link to={`/message/?to=${user.username}`}>Message</Link>
        <Link to={`/profile/${user.username}`}>View</Link>
        <Filter roleCheck={isAtLeastBoardMember}>
          <Link to={`/admin-profile/${user.username}`}>Edit</Link>
        </Filter>
      </span>
    </div>
  );
};

export default RosterCard;
